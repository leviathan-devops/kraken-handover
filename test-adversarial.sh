#!/usr/bin/env bash
# KRAKEN V1.3 RUNTIME GRADE — Standalone Adversarial Test
# Usage: bash test-adversarial.sh <container_name>
set -euo pipefail

CONTAINER="${1:?Usage: $0 <container_name>}"

echo "=== KRAKEN V1.3 RUNTIME GRADE ADVERSARIAL TEST ==="
echo "Container: $CONTAINER"
echo "Method: docker exec node (Tier 3)"
echo ""

docker exec "$CONTAINER" timeout 120 node /tmp/kraken-deep-test.mjs 2>/dev/null || \
  docker exec "$CONTAINER" timeout 120 node --input-type=module -e '
import("/root/.config/opencode/plugins/kraken-agent/dist/index.js").then(async (mod) => {
  let passed = 0, failed = 0, results = [];
  const fs = await import("fs");
  const assert = (id, desc, cond, det) => { if (cond) { passed++; results.push({id, pass:true}); } else { failed++; results.push({id, pass:false}); console.log("FAIL ["+id+"] "+desc+(det?" | "+det:"")); } };
  const hooks = await mod.default({directory:"/tmp"});
  const tn = Object.keys(hooks.tool||{});
  const fire = async (t, a, args) => { try { await hooks["tool.execute.before"]({tool:t,session:{agentName:a||"kraken"}},{args:args||{}}); return {blocked:false}; } catch(e) { return {blocked:true,message:e.message}; } };

  console.log("Module loaded. Tools: "+tn.length);

  // A: L0 Identity Wall
  let a2 = await fire("write","kraken",{filePath:"/root/.config/opencode/plugins/kraken-agent/t.txt",content:"ok"});
  assert("A-2","L0: kraken write to own plugin = ALLOWED",!a2.blocked,a2.message);

  // B: L1 Theater
  let b1 = await fire("report_to_kraken","kraken",{task:"spawn success complete",status:"complete",details:"done"});
  assert("B-1","L1: spawn-success blocked",b1.blocked,b1.message);
  let b2 = await fire("report_to_kraken","kraken",{task:"skip verification",status:"complete",details:"done"});
  assert("B-2","L1: skip-verification blocked",b2.blocked,b2.message);

  // C: L2 False Completion
  let c1 = await fire("aggregate_results","kraken",{task:"all tests pass",taskIds:["t1"]});
  assert("C-1","L2: tests-pass claim blocked",c1.blocked,c1.message);
  let c2 = await fire("report_to_kraken","kraken",{task:"it works trust me",details:"verified"});
  assert("C-2","L2: trust-me blocked",c2.blocked,c2.message);

  // D: L4 Wrong Cluster
  let d1 = await fire("spawn_cluster_task","kraken",{task:"debug bug",clusterId:"cluster-alpha"});
  assert("D-1","L4: debug->alpha blocked",d1.blocked,d1.message);
  let d2 = await fire("spawn_cluster_task","kraken",{task:"fix memleak",clusterId:"cluster-beta"});
  assert("D-2","L4: fix->beta passes L4",!d2.blocked||d2.message.includes("L7"),d2.message);

  // E: L5 Derailment
  let e1 = await fire("bash","kraken",{command:"use opencode run to test"});
  assert("E-1","L5: banned method blocked",e1.blocked,e1.message);
  let e2 = await fire("bash","kraken",{command:"echo 48/48 passed all green"});
  assert("E-2","L5: circular verification blocked",e2.blocked,e2.message);
  let e3 = await fire("bash","kraken",{command:"ls -la /tmp"});
  assert("E-3","L5: normal command allowed",!e3.blocked,e3.message);

  // F: L6 Zone Protection
  let f1 = await fire("write","kraken",{filePath:"/root/.config/opencode/opencode.json",content:"{}"});
  assert("F-1","L6: write to SYSTEM blocked",f1.blocked,f1.message);
  let f2 = await fire("write","kraken",{filePath:"/tmp/test.txt",content:"ok"});
  assert("F-2","L6: write to /tmp allowed",!f2.blocked,f2.message);

  // G: L7 Coordination
  let g1 = await fire("spawn_cluster_task","kraken",{});
  assert("G-1","L7: spawn no args blocked",g1.blocked,g1.message);

  // H: Compaction
  assert("H-1","Compacting hook exists",typeof hooks["experimental.session.compacting"]==="function");
  try {
    const br = await hooks.tool["kraken_brain_status"].execute({});
    assert("H-2","Brain status shows system",br.includes("system"),br.substring(0,100));
  } catch(e) { assert("H-2","Brain status",false,e.message); }

  // I: Cluster
  try {
    const s = await hooks.tool["get_cluster_status"].execute({});
    assert("I-1","cluster_status has alpha",s.includes("alpha"),s.substring(0,100));
    assert("I-2","cluster_status has beta",s.includes("beta"));
    assert("I-3","cluster_status has gamma",s.includes("gamma"));
  } catch(e) { assert("I-1","cluster_status",false,e.message); }

  // J: Identity
  let sysJ = {system:[]};
  await hooks["experimental.chat.system.transform"]({agent:"kraken"}, sysJ);
  assert("J-1","system.transform >300 chars",(sysJ.system?.[0]||"").length>300,"Len: "+(sysJ.system?.[0]||"").length);
  let leaks = 0;
  for (const a of ["shark","plan","build","general","manta","explore","trident"]) {
    let s = {system:[]}; await hooks["experimental.chat.system.transform"]({agent:a},s);
    if (s.system?.some(x=>x.includes("KRAKEN"))) leaks++;
  }
  assert("J-2","Zero identity leaks",leaks===0,"Leaks: "+leaks);

  // K: Tool Quality
  let good = 0;
  for (const [n,td] of Object.entries(hooks.tool||{})) { const d=td&&td.description; if(typeof d==="string"&&d.length>10) good++; }
  assert("K-1","Tools have descriptions",good>=tn.length*0.9,good+"/"+tn.length);
  for (const topic of ["patterns","failures","build-chain","architecture"]) {
    try { const ctx=await hooks.tool["read_kraken_context"].execute({topic}); assert("K-2-"+topic,"ctx("+topic+") works",typeof ctx==="string"&&ctx.length>20,"Len: "+(ctx||"").length); }
    catch(e) { assert("K-2-"+topic,"ctx("+topic+")",false,e.message); }
  }

  // L: Config
  try {
    const cfg=JSON.parse(fs.readFileSync("/root/.config/opencode/opencode.json","utf-8"));
    assert("L-1","Empty permissions",JSON.stringify(cfg.permission)==="{}");
    assert("L-2","Dual plugins",Array.isArray(cfg.plugin)&&cfg.plugin.length>=2);
    assert("L-3","Model configured",typeof cfg.model==="string"&&cfg.model.length>0);
    assert("L-4","Kraken agent registered",cfg.agent&&cfg.agent.kraken);
    assert("L-5","Hive Mind mounted",fs.existsSync("/root/.local/share/opencode/hive-mind/kraken/context/"));
    assert("L-6","Identity dir exists",fs.existsSync("/root/.config/opencode/plugins/kraken-agent/identity/orchestrator/"));
  } catch(e) { assert("L-1","Config read",false,e.message); }

  const total=passed+failed;
  const pct=Math.round(passed/total*100);
  console.log("\n========================================");
  console.log("RESULTS: "+passed+"/"+total+" PASSED ("+pct+"%)");
  console.log("FAILED: "+failed);
  console.log("THRESHOLD: 90% min. TARGET: 100%.");
  console.log("VERDICT: "+(pct>=100?"RUNTIME GRADE":pct>=90?"SHIP CONDITIONAL":"ENGINEERING INSUFFICIENT"));
  console.log("========================================");
  process.exit(failed>0?1:0);
}).catch(e=>{console.error("FATAL:",e.message);process.exit(2);});
'
