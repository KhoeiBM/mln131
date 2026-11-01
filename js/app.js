/* ============================================================
   CÔNG NHÂN SỐ – Chọn năng lực, giải bài toán
   Web điều hành trò chơi (thuần HTML/CSS/JS, chạy offline).
   - Nội dung đề thi để trống trong cấu hình mặc định, BTC điền
     tại trang "Soạn nội dung"; dữ liệu lưu ở localStorage.
   ============================================================ */
"use strict";

/* ---------------- Hằng số ---------------- */
var CARDS = [
  { letter: "A", name: "Chuyên môn, tay nghề", desc: "Hiểu nghiệp vụ, quy trình, tiêu chuẩn", color: "#38bdf8" },
  { letter: "B", name: "Năng lực số & ứng dụng công nghệ", desc: "Sử dụng thiết bị, phần mềm, dữ liệu, AI", color: "#22d3ee" },
  { letter: "C", name: "Tư duy phản biện & giải quyết vấn đề", desc: "Kiểm chứng, phân tích, xử lý tình huống", color: "#a78bfa" },
  { letter: "D", name: "Tự học & thích ứng", desc: "Học kỹ năng mới, chuyển đổi nhiệm vụ", color: "#34d399" },
  { letter: "E", name: "Giao tiếp, hợp tác & ngoại ngữ", desc: "Phối hợp, trao đổi, tiếp cận tài liệu", color: "#fbbf24" },
  { letter: "F", name: "Tác phong, trách nhiệm & ý thức quyền lợi", desc: "Kỷ luật, đạo đức, an toàn và quyền lợi", color: "#fb7185" }
];

var MATCH_DEFS = [
  { id: "R1M1", type: "case",  round: "Vòng 1 · Nhận diện năng lực", title: "Trận 1 – Vòng bảng", short: "Trận 1", caseIndex: 0, fixedTeams: [0, 1] },
  { id: "R1M2", type: "case",  round: "Vòng 1 · Nhận diện năng lực", title: "Trận 2 – Vòng bảng", short: "Trận 2", caseIndex: 1, fixedTeams: [2, 3] },
  { id: "R1M3", type: "case",  round: "Vòng 1 · Nhận diện năng lực", title: "Trận 3 – Vòng bảng", short: "Trận 3", caseIndex: 2, fixedTeams: [4, 5] },
  { id: "R1M4", type: "case",  round: "Vòng 1 · Nhận diện năng lực", title: "Trận 4 – Vòng bảng", short: "Trận 4", caseIndex: 3, fixedTeams: [6, 7] },
  { id: "R2M1", type: "major", round: "Vòng 2 · My Major, My Future", title: "Bán kết 1", short: "BK1", feeds: ["R1M1", "R1M2"] },
  { id: "R2M2", type: "major", round: "Vòng 2 · My Major, My Future", title: "Bán kết 2", short: "BK2", feeds: ["R1M3", "R1M4"] },
  { id: "F1",   type: "debate", round: "Vòng 3 · The Final Debate", title: "CHUNG KẾT", short: "CK", feeds: ["R2M1", "R2M2"] }
];

var DEBATE_ROUNDS = [
  { n: 1, purpose: "Trình bày luận điểm", prep: 120, speak: 60 },
  { n: 2, purpose: "Phản biện lần 1",     prep: 90,  speak: 60 },
  { n: 3, purpose: "Phản biện lần 2",     prep: 90,  speak: 60 },
  { n: 4, purpose: "Tổng kết",            prep: 90,  speak: 90 }
];

var DEFAULT_TOPIC = "Trong 10 năm tới, AI sẽ chủ yếu thay thế người lao động thay vì hỗ trợ họ làm việc.";
var LS_CONFIG = "cns_config_v1";
var LS_STATE = "cns_state_v1";
var RING_C = 552.92;

/* ---------------- Trạng thái ---------------- */
function defaultConfig() {
  var teams = [], cases = [], i;
  for (i = 0; i < 8; i++) teams.push({ name: "Đội " + (i + 1), major: "" });
  for (i = 0; i < 4; i++) cases.push({ title: "", content: "", source: "", image: "" });
  return { teams: teams, cases: cases, finalTopic: DEFAULT_TOPIC };
}
function blankMatchState() {
  return { phase: 0, winner: null, votes: [], picks: { A: [], B: [] }, stanceA: null };
}
function defaultState() {
  var m = {};
  MATCH_DEFS.forEach(function (d) { m[d.id] = blankMatchState(); });
  return { matches: m, currentMatchId: null };
}
function sanitizeConfig(c) {
  var d = defaultConfig(), i, t, k;
  if (!c || typeof c !== "object") return d;
  if (Array.isArray(c.teams)) for (i = 0; i < 8; i++) if (c.teams[i]) {
    d.teams[i].name = String(c.teams[i].name == null ? "" : c.teams[i].name);
    d.teams[i].major = String(c.teams[i].major == null ? "" : c.teams[i].major);
  }
  if (Array.isArray(c.cases)) for (i = 0; i < 4; i++) if (c.cases[i]) {
    ["title", "content", "source", "image"].forEach(function (f) { d.cases[i][f] = String(c.cases[i][f] == null ? "" : c.cases[i][f]); });
  }
  if (typeof c.finalTopic === "string") d.finalTopic = c.finalTopic;
  return d;
}
function sanitizeState(s) {
  var d = defaultState();
  if (!s || typeof s !== "object" || !s.matches) return d;
  MATCH_DEFS.forEach(function (def) {
    var m = s.matches[def.id]; if (!m) return;
    var t = d.matches[def.id];
    if (Number.isInteger(m.phase) && m.phase >= 0) t.phase = m.phase;
    if (Number.isInteger(m.winner) && m.winner >= 0 && m.winner < 8) t.winner = m.winner;
    if (Array.isArray(m.votes)) t.votes = m.votes.filter(function (v) { return v === "A" || v === "B"; }).slice(0, 7);
    if (m.picks) ["A", "B"].forEach(function (side) {
      if (Array.isArray(m.picks[side])) t.picks[side] = m.picks[side].filter(function (L) { return "ABCDEF".indexOf(L) >= 0; });
    });
    if (m.stanceA === "agree" || m.stanceA === "disagree") t.stanceA = m.stanceA;
  });
  if (s.currentMatchId && d.matches[s.currentMatchId]) d.currentMatchId = s.currentMatchId;
  return d;
}
function loadJSON(key, fallback) {
  try { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback(); }
  catch (e) { return fallback(); }
}
var config = sanitizeConfig(loadJSON(LS_CONFIG, defaultConfig));
var tstate = sanitizeState(loadJSON(LS_STATE, defaultState));
var currentView = "home";
var drawingStance = false;

function saveConfig(markSaved) {
  try { localStorage.setItem(LS_CONFIG, JSON.stringify(config)); } catch (e) {}
  if (markSaved) {
    var el = document.getElementById("saveStatus");
    if (el) el.textContent = "✓ Đã lưu " + new Date().toLocaleTimeString("vi-VN");
  }
}
function saveState() { try { localStorage.setItem(LS_STATE, JSON.stringify(tstate)); } catch (e) {} }

/* ---------------- Tiện ích ---------------- */
function $(sel, root) { return (root || document).querySelector(sel); }
function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, function (ch) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
  });
}
function isURL(s) { return /^https?:\/\//i.test(String(s || "").trim()); }
function teamName(i) {
  if (i == null || !config.teams[i]) return "—";
  var n = config.teams[i].name.trim();
  return n || ("Đội " + (i + 1));
}
function teamMajor(i) { return (i != null && config.teams[i]) ? config.teams[i].major.trim() : ""; }
function cardOf(letter) { for (var i = 0; i < CARDS.length; i++) if (CARDS[i].letter === letter) return CARDS[i]; return null; }
function matchDef(id) { for (var i = 0; i < MATCH_DEFS.length; i++) if (MATCH_DEFS[i].id === id) return MATCH_DEFS[i]; return null; }
function matchState(id) { return tstate.matches[id]; }
function voteCounts(ms) {
  var a = 0, b = 0;
  ms.votes.forEach(function (v) { if (v === "A") a++; else b++; });
  return { A: a, B: b };
}
var toastTimer = null;
function toast(msg) {
  var el = $("#toast");
  el.textContent = msg; el.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { el.classList.add("hidden"); }, 3200);
}

/* Đội tham dự một trận: trả về [{idx,label},{idx,label}] (idx=null nếu chưa rõ) */
function participantSlots(def) {
  if (def.fixedTeams) return def.fixedTeams.map(function (i) { return { idx: i, label: teamName(i) }; });
  return def.feeds.map(function (fid) {
    var w = matchState(fid).winner;
    return (w == null) ? { idx: null, label: "Thắng " + matchDef(fid).short } : { idx: w, label: teamName(w) };
  });
}
function participantIndexes(def) {
  var s = participantSlots(def);
  return (s[0].idx == null || s[1].idx == null) ? null : [s[0].idx, s[1].idx];
}
function downstreamOf(id) {
  var out = [], seen = {};
  (function walk(mid) {
    MATCH_DEFS.forEach(function (d) {
      if (d.feeds && d.feeds.indexOf(mid) >= 0 && !seen[d.id]) { seen[d.id] = 1; out.push(d.id); walk(d.id); }
    });
  })(id);
  return out;
}
function clearWinner(mid) {
  var ms = matchState(mid);
  if (ms.winner == null) return;
  ms.winner = null;
  downstreamOf(mid).forEach(function (did) { tstate.matches[did] = blankMatchState(); });
}

/* ---------------- Âm thanh bíp ---------------- */
var audioCtx = null;
function beep(freq, dur) {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    var o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.type = "sine"; o.frequency.value = freq || 880;
    g.gain.setValueAtTime(0.18, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + (dur || 0.14));
    o.connect(g); g.connect(audioCtx.destination);
    o.start(); o.stop(audioCtx.currentTime + (dur || 0.14));
  } catch (e) {}
}

/* ---------------- Đồng hồ ---------------- */
var timer = { dur: 0, left: 0, running: false, int: null, endAt: 0, lastBeep: -1 };
function stopTimer() {
  timer.running = false;
  if (timer.int) { clearInterval(timer.int); timer.int = null; }
}
function setTimer(seconds) {
  stopTimer();
  timer.dur = seconds || 0; timer.left = timer.dur; timer.lastBeep = -1;
  renderTimer();
}
function timerTick() {
  var left = Math.max(0, Math.ceil((timer.endAt - Date.now()) / 1000));
  if (left !== timer.left) {
    timer.left = left;
    if (left <= 3 && left >= 1 && timer.lastBeep !== left) { timer.lastBeep = left; beep(750, 0.1); }
  }
  if (left <= 0) {
    stopTimer(); timer.left = 0; renderTimer();
    beep(1046, 0.22); setTimeout(function () { beep(1046, 0.22); }, 280); setTimeout(function () { beep(1318, 0.34); }, 560);
    toast("⏰ Hết giờ!");
    return;
  }
  renderTimer();
}
function toggleTimer() {
  if (timer.dur <= 0) return;
  if (timer.running) { timer.left = Math.max(0, Math.ceil((timer.endAt - Date.now()) / 1000)); stopTimer(); renderTimer(); return; }
  if (timer.left <= 0) timer.left = timer.dur;
  timer.endAt = Date.now() + timer.left * 1000;
  timer.running = true; timer.lastBeep = -1;
  timer.int = setInterval(timerTick, 120);
  beep(660, 0.07);
  renderTimer();
}
function adjustTimer(delta) {
  if (timer.dur <= 0) return;
  timer.left = Math.max(0, timer.left + delta);
  if (timer.left > timer.dur) timer.dur = timer.left;
  if (timer.running) timer.endAt = Date.now() + timer.left * 1000;
  renderTimer();
}
function fmtTime(s) {
  s = Math.max(0, Math.floor(s));
  return (Math.floor(s / 60)) + ":" + ("0" + (s % 60)).slice(-2);
}
function renderTimer() {
  var disp = $("#timerDisplay"), card = $("#timerCard"), ring = $("#ringFg"),
      status = $("#timerStatus"), btn = $("#btnTimerToggle"), bar = $("#timerProgressFg");
  if (!disp) return;
  if (timer.dur <= 0) {
    disp.textContent = "--:--"; ring.style.strokeDashoffset = 0;
    if (bar) bar.style.width = "0%";
    card.classList.remove("warn", "danger");
    status.textContent = "Bước này không bấm giờ";
    btn.disabled = true; btn.textContent = "▶ Bắt đầu";
    $("#btnTimerReset").disabled = true; $("#btnTimerPlus").disabled = true; $("#btnTimerMinus").disabled = true;
    return;
  }
  disp.textContent = fmtTime(timer.left);
  var frac = timer.dur > 0 ? (timer.left / timer.dur) : 0;
  ring.style.strokeDashoffset = (RING_C * (1 - frac)).toFixed(1);
  if (bar) bar.style.width = (frac * 100).toFixed(1) + "%";
  card.classList.toggle("warn", timer.left <= 30 && timer.left > 10);
  card.classList.toggle("danger", timer.left <= 10);
  status.textContent = timer.running ? "Đang chạy… (Space để dừng)" :
    (timer.left === 0 ? "⏰ Đã hết giờ" : (timer.left === timer.dur ? "Sẵn sàng — bấm Bắt đầu" : "Đang tạm dừng"));
  btn.disabled = false; btn.textContent = timer.running ? "⏸ Tạm dừng" : "▶ Bắt đầu";
  $("#btnTimerReset").disabled = false; $("#btnTimerPlus").disabled = false; $("#btnTimerMinus").disabled = false;
}

/* ---------------- Các bước (phase) của từng loại trận ---------------- */
function buildPhases(def) {
  var parts = participantIndexes(def);
  var nA = parts ? teamName(parts[0]) : "Đội XANH";
  var nB = parts ? teamName(parts[1]) : "Đội ĐỎ";
  if (def.type === "case") return [
    { key: "intro", short: "Công bố đề", timer: 0,
      title: "📣 Công bố trường hợp thực tế",
      desc: "MC giới thiệu trường hợp cho cả hai đội. Hai đội lắng nghe, ghi chú ý chính trước khi bước vào 1 phút thảo luận." },
    { key: "discuss", short: "Thảo luận 1′", timer: 60,
      title: "💬 Thảo luận & chọn 2 thẻ năng lực",
      desc: "Hai đội có 1 phút hội ý và chọn đúng 2 năng lực ưu tiên nhất. Hết giờ, theo hiệu lệnh “3, 2, 1 – Giơ thẻ!”, MC nhập 2 thẻ của mỗi đội vào bên dưới." },
    { key: "present", side: "A", short: "Trình bày " + nA, timer: 60,
      title: "🎤 " + nA + " trình bày", desc: "Đội XANH trình bày trong 1 phút." },
    { key: "present", side: "B", short: "Trình bày " + nB, timer: 60,
      title: "🎤 " + nB + " trình bày", desc: "Đội ĐỎ trình bày trong 1 phút." },
    { key: "vote", short: "Bình chọn", timer: 0,
      title: "🗳️ Bình chọn của 7 giám khảo",
      desc: "7 giám khảo giơ thẻ: XANH chọn " + nA + ", ĐỎ chọn " + nB + ". MC ghi từng phiếu vào bên dưới; đủ 7 phiếu mới chốt được kết quả." },
    { key: "result", short: "Kết quả", timer: 0, title: "🏁 Công bố kết quả", desc: "" }
  ];
  if (def.type === "major") return [
    { key: "intro", short: "Công bố ngành", timer: 0,
      title: "🎓 Ngành học của hai đội",
      desc: "Mỗi đội phân tích ngành học của chính mình tại FPT Hà Nội theo 2 câu hỏi khung." },
    { key: "discuss", short: "Thảo luận 2′", timer: 120,
      title: "💬 Thảo luận (2 phút)",
      desc: "Hai đội thảo luận đồng thời trong 2 phút. MC có thể đánh dấu trước những thẻ năng lực đội dự định đề xuất (nếu đội công bố)." },
    { key: "present", side: "A", short: "Trình bày " + nA, timer: 90,
      title: "🎤 " + nA + " trình bày", desc: "Đội XANH trình bày trong 1 phút 30 giây." },
    { key: "present", side: "B", short: "Trình bày " + nB, timer: 90,
      title: "🎤 " + nB + " trình bày", desc: "Đội ĐỎ trình bày trong 1 phút 30 giây." },
    { key: "vote", short: "Bình chọn", timer: 0,
      title: "🗳️ Bình chọn của 7 giám khảo",
      desc: "7 giám khảo chọn đội có phần phân tích thuyết phục hơn. XANH = " + nA + " · ĐỎ = " + nB + "." },
    { key: "result", short: "Kết quả", timer: 0, title: "🏁 Công bố kết quả", desc: "" }
  ];
  /* debate */
  var ph = [{ key: "stance", short: "Bốc thăm phe", timer: 0,
    title: "🎲 Bốc thăm lập trường",
    desc: "Đại diện hai đội bốc thăm: một đội thuộc phe Đồng tình (bảo vệ nhận định), đội còn lại thuộc phe Phản đối. MC bấm nút bốc thăm ngẫu nhiên hoặc đổi phe thủ công nếu bốc thăm bằng phiếu giấy." }];
  DEBATE_ROUNDS.forEach(function (r) {
    ph.push({ key: "prep", round: r.n, timer: r.prep, short: "L" + r.n + " chuẩn bị",
      title: "📝 Lượt " + r.n + " – Chuẩn bị: " + r.purpose,
      desc: "Cả hai đội chuẩn bị trong " + fmtTime(r.prep) + ". Sau khi hết giờ, phe Đồng tình phát biểu trước, phe Phản đối phát biểu sau." });
    ph.push({ key: "speak", round: r.n, stance: "agree", timer: r.speak, short: "L" + r.n + " Đồng tình",
      title: "", desc: "" });
    ph.push({ key: "speak", round: r.n, stance: "disagree", timer: r.speak, short: "L" + r.n + " Phản đối",
      title: "", desc: "" });
  });
  ph.push({ key: "vote", short: "Bình chọn", timer: 0,
    title: "🗳️ Bình chọn chung kết",
    desc: "7 giám khảo bình chọn đội tranh biện thuyết phục hơn qua cả 4 lượt." });
  ph.push({ key: "result", short: "Quán quân", timer: 0, title: "🏆 Công bố QUÁN QUÂN", desc: "" });
  return ph;
}
function sideForStance(ms, stance) {
  if (!ms.stanceA) return null;
  return (ms.stanceA === stance) ? "A" : "B";
}
function stanceOfSide(ms, side) {
  if (!ms.stanceA) return null;
  if (side === "A") return ms.stanceA;
  return ms.stanceA === "agree" ? "disagree" : "agree";
}
function stanceLabel(stance) { return stance === "agree" ? "ĐỒNG TÌNH" : stance === "disagree" ? "PHẢN ĐỐI" : "Chưa bốc thăm"; }

/* ---------------- Render: Tổng quan ---------------- */
function completedCount() {
  var n = 0;
  MATCH_DEFS.forEach(function (d) { if (matchState(d.id).winner != null) n++; });
  return n;
}
function renderHome() {
  $("#homeTeams").innerHTML = config.teams.map(function (t, i) {
    return '<div class="team-chip"><div class="tname">' + esc(teamName(i)) + '</div>' +
      '<div class="tmajor">' + (t.major.trim() ? "🎓 " + esc(t.major.trim()) : '<span class="blank-note">[Ngành học để trống]</span>') + "</div></div>";
  }).join("");
  $("#homeCards").innerHTML = CARDS.map(function (c) {
    return '<article class="comp-card" style="--cc:' + c.color + '"><span class="comp-letter">' + c.letter +
      "</span><h4>" + esc(c.name) + "</h4><p>" + esc(c.desc) + "</p></article>";
  }).join("");
  $("#homeTopic").textContent = config.finalTopic.trim() ? "“" + config.finalTopic.trim() + "”" : "[Để trống — BTC bổ sung]";
  var done = completedCount(), champ = matchState("F1").winner;
  $("#homeProgress").innerHTML = champ != null
    ? "🏆 <strong>Quán quân: " + esc(teamName(champ)) + "</strong> · Giải đấu đã hoàn thành " + done + "/7 trận."
    : "Tiến độ giải đấu: <strong>" + done + "/7 trận</strong> đã có đội thắng.";
}

/* ---------------- Render: Sơ đồ đấu ---------------- */
function matchStatus(def) {
  var ms = matchState(def.id);
  if (ms.winner != null) return { cls: "done", label: "ĐÃ XONG" };
  if (!participantIndexes(def)) return { cls: "", label: "Chờ đội thắng" };
  if (ms.phase > 0 || ms.votes.length || ms.picks.A.length || ms.picks.B.length || ms.stanceA) return { cls: "playing", label: "ĐANG ĐẤU" };
  return { cls: "", label: "Sẵn sàng" };
}
function matchCardHTML(def) {
  var ms = matchState(def.id), slots = participantSlots(def), counts = voteCounts(ms), st = matchStatus(def);
  var ready = !!participantIndexes(def);
  function row(side, i) {
    var isWin = ms.winner != null && slots[i].idx === ms.winner;
    return '<div class="m-team' + (isWin ? " win" : "") + '"><span>' + (isWin ? "👑 " : "") + esc(slots[i].label) + "</span>" +
      '<span class="side-tag side-' + side.toLowerCase() + '-tag">' + (side === "A" ? "XANH" : "ĐỎ") + "</span>" +
      (ms.votes.length ? '<span class="votes">' + counts[side] + "</span>" : "") + "</div>";
  }
  var btnLabel = ms.winner != null ? "Xem lại trận" : (st.cls === "playing" ? "Tiếp tục trận →" : "Vào trận →");
  return '<div class="match-card' + (ms.winner != null ? " done" : "") + '">' +
    '<div class="m-title"><span>' + esc(def.title) + '</span><span class="badge ' + st.cls + '">' + st.label + "</span></div>" +
    '<div class="m-teams">' + row("A", 0) + row("B", 1) + "</div>" +
    '<button type="button" class="' + (ready ? "primary-btn" : "secondary-btn") + '" data-open-match="' + def.id + '"' + (ready ? "" : " disabled") + ">" + btnLabel + "</button></div>";
}
function renderBracket() {
  var cols = [
    { title: "VÒNG 1 · NHẬN DIỆN NĂNG LỰC", ids: ["R1M1", "R1M2", "R1M3", "R1M4"], cls: "" },
    { title: "VÒNG 2 · MY MAJOR, MY FUTURE", ids: ["R2M1", "R2M2"], cls: "" },
    { title: "VÒNG 3 · THE FINAL DEBATE", ids: ["F1"], cls: "final-col" }
  ];
  $("#bracketBoard").innerHTML = cols.map(function (c) {
    return '<div class="bracket-col ' + c.cls + '"><h3>' + c.title + "</h3>" +
      c.ids.map(function (id) { return matchCardHTML(matchDef(id)); }).join("") + "</div>";
  }).join("");
  $("#bracketProgress").textContent = "Đã hoàn thành " + completedCount() + "/7 trận.";
  var champ = matchState("F1").winner, banner = $("#championBanner");
  if (champ != null) {
    banner.textContent = "🏆 QUÁN QUÂN – ĐỘI CÔNG NHÂN SỐ: " + teamName(champ).toUpperCase() + " 🎉";
    banner.classList.remove("hidden");
  } else banner.classList.add("hidden");
}

/* ---------------- Render: Trận đấu ---------------- */
function currentDef() { return tstate.currentMatchId ? matchDef(tstate.currentMatchId) : null; }
function picksSummaryHTML(ms, side) {
  var arr = ms.picks[side];
  if (!arr.length) return '<span class="blank-note">Chưa chọn thẻ</span>';
  return arr.map(function (L) { var c = cardOf(L); return '<strong style="color:' + c.color + '">' + L + "</strong>"; }).join(" · ");
}
function renderMatch(resetClock) {
  var def = currentDef();
  var empty = $("#matchEmpty"), main = $("#matchMain");
  if (!def) { empty.classList.remove("hidden"); main.classList.add("hidden"); setTimer(0); return; }
  var parts = participantIndexes(def);
  if (!parts) { empty.classList.remove("hidden"); main.classList.add("hidden"); return; }
  empty.classList.add("hidden"); main.classList.remove("hidden");

  var ms = matchState(def.id);
  var phases = buildPhases(def);
  if (ms.phase < 0) ms.phase = 0;
  if (ms.phase >= phases.length) ms.phase = phases.length - 1;
  var ph = phases[ms.phase];

  $("#matchRound").textContent = def.round;
  $("#matchTitle").textContent = def.title;

  /* VS panel */
  var speakSide = null;
  if (ph.key === "present") speakSide = ph.side;
  if (ph.key === "speak") speakSide = sideForStance(ms, ph.stance);
  function vsTeam(side, idx) {
    var sub = "";
    if (def.type === "major") sub = teamMajor(idx) ? "🎓 " + esc(teamMajor(idx)) : '<span class="blank-note">[Ngành học để trống]</span>';
    else if (def.type === "debate") sub = "Phe: <strong>" + stanceLabel(stanceOfSide(ms, side)) + "</strong>";
    else sub = "Thẻ: " + picksSummaryHTML(ms, side);
    return '<div class="vs-team side-' + side.toLowerCase() + (speakSide === side ? " is-speaking" : "") + '">' +
      '<div class="vs-side">' + (side === "A" ? "🟦 ĐỘI XANH" : "🟥 ĐỘI ĐỎ") + (ms.winner === idx ? " · 👑 THẮNG" : "") + "</div>" +
      '<div class="vs-name">' + esc(teamName(idx)) + '</div><div class="vs-sub">' + sub + "</div></div>";
  }
  $("#matchVs").innerHTML = vsTeam("A", parts[0]) + '<div class="vs-mid">VS</div>' + vsTeam("B", parts[1]);

  /* Stepper / debate tracker */
  var stepper = $("#phaseStepper"), tracker = $("#debateTracker");
  if (def.type === "debate") {
    stepper.classList.add("hidden"); tracker.classList.remove("hidden");
    var curRound = (ph.round || 0);
    var chips = ['<span class="debate-chip' + (ph.key === "stance" ? " current" : (ms.stanceA ? " done" : "")) + '">🎲 Bốc thăm phe</span>'];
    DEBATE_ROUNDS.forEach(function (r) {
      var cls = (curRound === r.n) ? " current" : ((curRound > r.n || ph.key === "vote" || ph.key === "result") ? " done" : "");
      chips.push('<span class="debate-chip' + cls + '">Lượt ' + r.n + ": " + r.purpose + "</span>");
    });
    chips.push('<span class="debate-chip' + (ph.key === "vote" ? " current" : ph.key === "result" ? " done" : "") + '">🗳 Bình chọn</span>');
    chips.push('<span class="debate-chip' + (ph.key === "result" ? " current" : "") + '">🏆 Quán quân</span>');
    tracker.innerHTML = chips.join("");
  } else {
    tracker.classList.add("hidden"); stepper.classList.remove("hidden");
    stepper.innerHTML = phases.map(function (p, i) {
      return '<span class="step-pill' + (i === ms.phase ? " current" : i < ms.phase ? " done" : "") + '">' + esc(p.short) + "</span>";
    }).join("");
  }

  /* Tiêu đề + nội dung bước */
  var title = ph.title, desc = ph.desc;
  if (ph.key === "speak") {
    var r = DEBATE_ROUNDS[ph.round - 1];
    var spSide = sideForStance(ms, ph.stance);
    var spName = spSide ? teamName(parts[spSide === "A" ? 0 : 1]) : "—";
    title = "🎤 Lượt " + ph.round + " – " + r.purpose + ": " + stanceLabel(ph.stance);
    desc = spName + " phát biểu trong " + fmtTime(r.speak) + ".";
  }
  $("#phaseTitle").textContent = title;
  $("#phaseDesc").textContent = desc || "";
  $("#phaseContent").innerHTML = phaseContentHTML(ph, def, ms, parts);
  $("#phaseProgressText").textContent = "Bước " + (ms.phase + 1) + "/" + phases.length;
  $("#btnPrevPhase").disabled = (ms.phase === 0);
  $("#btnNextPhase").disabled = (ms.phase === phases.length - 1);
  if (resetClock) setTimer(ph.timer || 0); else renderTimer();
}
function blankBoxHTML(title, note) {
  return '<div class="blank-box"><span class="big-blank">⬜ ' + esc(title) + "</span>" + esc(note) +
    '<div class="center-actions"><button type="button" class="secondary-btn" data-nav="editor">✏️ Đi tới Soạn nội dung</button></div></div>';
}
function chosenCardsHTML(ms, side) {
  var arr = ms.picks[side];
  if (!arr.length) return '<p class="hint" style="text-align:center">MC chưa nhập thẻ của đội — có thể quay lại bước Thảo luận để nhập, phần trình bày vẫn diễn ra bình thường bằng thẻ giấy.</p>';
  return '<div class="chosen-cards">' + arr.map(function (L) {
    var c = cardOf(L);
    return '<div class="chosen-card" style="--cc:' + c.color + '"><div class="cl">' + c.letter + '</div><div class="cn">' + esc(c.name) + '</div><div class="cd">' + esc(c.desc) + "</div></div>";
  }).join("") + "</div>";
}
function pickColumnHTML(def, ms, parts, side) {
  var idx = parts[side === "A" ? 0 : 1];
  var arr = ms.picks[side];
  var countHTML = def.type === "case"
    ? '<div class="pick-count ' + (arr.length === 2 ? "ok" : "notok") + '">Đã chọn ' + arr.length + "/2 thẻ" + (arr.length === 2 ? " ✓" : "") + "</div>"
    : '<div class="pick-count">Đã đánh dấu ' + arr.length + " thẻ</div>";
  return '<div class="pick-col side-' + side.toLowerCase() + '"><h4>' + (side === "A" ? "🟦 " : "🟥 ") + esc(teamName(idx)) + "</h4>" +
    '<div class="pick-grid">' + CARDS.map(function (c) {
      var sel = arr.indexOf(c.letter) >= 0;
      return '<button type="button" class="pick-btn' + (sel ? " selected" : "") + '" style="--cc:' + c.color +
        '" data-pick-side="' + side + '" data-pick-letter="' + c.letter + '"><span class="pl">' + c.letter + '</span><span class="pn">' + esc(c.name) + "</span></button>";
    }).join("") + "</div>" + countHTML + "</div>";
}
function phaseContentHTML(ph, def, ms, parts) {
  var nA = teamName(parts[0]), nB = teamName(parts[1]);

  if (ph.key === "intro" && def.type === "case") {
    var c = config.cases[def.caseIndex];
    if (!c.title.trim() && !c.content.trim())
      return blankBoxHTML("TRƯỜNG HỢP THỰC TẾ " + (def.caseIndex + 1) + " ĐANG ĐỂ TRỐNG",
        "BTC bổ sung tiêu đề, nội dung trường hợp và nguồn xác nhận tại trang Soạn nội dung trước khi thi đấu.");
    var html = '<div class="case-box"><h4>' + esc(c.title.trim() || ("Trường hợp " + (def.caseIndex + 1))) + "</h4>" +
      '<div class="case-body">' + esc(c.content.trim() || "[Nội dung trường hợp đang để trống]") + "</div>";
    if (c.image.trim() && isURL(c.image)) html += '<img class="case-img" src="' + esc(c.image.trim()) + '" alt="Ảnh minh họa trường hợp" onerror="this.remove()">';
    html += '<div class="case-source">📌 Nguồn xác nhận: ' +
      (c.source.trim() ? (isURL(c.source) ? '<a href="' + esc(c.source.trim()) + '" target="_blank" rel="noopener noreferrer">' + esc(c.source.trim()) + "</a>" : esc(c.source.trim())) : '<span class="blank-note">[Chưa ghi nguồn]</span>') + "</div></div>";
    html += '<ul class="cue-list"><li><strong>Yêu cầu cho hai đội:</strong> chọn đúng <strong>2 năng lực A–F</strong> cần ưu tiên nhất cho trường hợp này và chuẩn bị giải thích: vì sao chọn hai năng lực đó, vận dụng bằng hành động cụ thể nào?</li></ul>';
    return html;
  }

  if (ph.key === "intro" && def.type === "major") {
    function majorBox(idx) {
      var m = teamMajor(idx);
      return m
        ? '<div class="case-box"><h4>' + esc(teamName(idx)) + '</h4><div class="case-body">🎓 Ngành học: <strong>' + esc(m) + "</strong></div></div>"
        : blankBoxHTML("NGÀNH HỌC CỦA " + teamName(idx).toUpperCase() + " ĐANG ĐỂ TRỐNG", "BTC/đội điền ngành học tại trang Soạn nội dung.");
    }
    return '<div class="two-cols">' + majorBox(parts[0]) + majorBox(parts[1]) + "</div>" +
      '<ul class="cue-list"><li><strong>Câu hỏi 1:</strong> Trong thời đại số, công việc hoặc yêu cầu lao động của ngành học đó đang thay đổi như thế nào?</li>' +
      "<li><strong>Câu hỏi 2:</strong> Đề xuất các năng lực quan trọng, cần ưu tiên nhất để thích ứng trong ngành đó và giải thích vì sao.</li></ul>";
  }

  if (ph.key === "discuss") {
    var note = def.type === "case"
      ? "Bấm <strong>Bắt đầu</strong> ở đồng hồ bên phải để tính 1 phút thảo luận. Hết giờ, theo hiệu lệnh giơ thẻ, MC bấm chọn đúng 2 thẻ cho mỗi đội."
      : "Bấm <strong>Bắt đầu</strong> để tính 2 phút thảo luận đồng thời cho hai đội.";
    return '<p>' + note + '</p><div class="two-cols">' + pickColumnHTML(def, ms, parts, "A") + pickColumnHTML(def, ms, parts, "B") + "</div>";
  }

  if (ph.key === "present") {
    var idxP = parts[ph.side === "A" ? 0 : 1];
    var cue = def.type === "case"
      ? '<ul class="cue-list"><li>Đội chọn hai năng lực nào?</li><li>Vì sao ưu tiên hai năng lực đó cho trường hợp thực tế này?</li><li>Vận dụng bằng những hành động cụ thể nào?</li></ul>'
      : '<ul class="cue-list"><li>Ngành <strong>' + esc(teamMajor(idxP) || "[để trống]") + '</strong> đang thay đổi thế nào trong thời đại số?</li><li>Những năng lực nào cần ưu tiên nhất để thích ứng? Vì sao?</li></ul>';
    return '<div class="present-box"><div class="present-role">Đang trình bày</div><div class="present-team">' + esc(teamName(idxP)) + "</div>" +
      chosenCardsHTML(ms, ph.side) + cue + "</div>";
  }

  if (ph.key === "stance") {
    var topic = config.finalTopic.trim();
    var topicHTML = topic
      ? '<div class="topic-box"><div class="hint">CHỦ ĐỀ TRANH BIỆN CHÍNH THỨC</div><div class="topic-text">“' + esc(topic) + '”</div></div>'
      : blankBoxHTML("CHỦ ĐỀ TRANH BIỆN ĐANG ĐỂ TRỐNG", "BTC bổ sung chủ đề tại trang Soạn nội dung.");
    var agreeSide = sideForStance(ms, "agree"), disSide = sideForStance(ms, "disagree");
    function stanceCard(kind, side, label) {
      var t = side ? teamName(parts[side === "A" ? 0 : 1]) : (drawingStance ? "🎲 Đang bốc thăm…" : "Chưa bốc thăm");
      return '<div class="stance-card ' + kind + '"><div class="stance-name">' + label + '</div><div class="stance-team">' + esc(t) + "</div></div>";
    }
    return topicHTML +
      '<div class="stance-grid">' + stanceCard("agree", agreeSide, "✅ ĐỒNG TÌNH") + stanceCard("disagree", disSide, "⛔ PHẢN ĐỐI") + "</div>" +
      '<div class="center-actions"><button type="button" class="primary-btn big" data-draw-stance' + (drawingStance ? " disabled" : "") + ">🎲 Bốc thăm ngẫu nhiên</button>" +
      '<button type="button" class="secondary-btn" data-swap-stance' + (ms.stanceA ? "" : " disabled") + ">⇄ Đổi phe cho nhau</button></div>" +
      '<p class="hint" style="text-align:center">Đã có kết quả bốc thăm mới bấm được “Bước tiếp”. Thứ tự mặc định mỗi lượt: Đồng tình nói trước, Phản đối nói sau.</p>';
  }

  if (ph.key === "prep") {
    var rp = DEBATE_ROUNDS[ph.round - 1];
    var ag = sideForStance(ms, "agree"), dg = sideForStance(ms, "disagree");
    return '<div class="present-box"><div class="present-role">Thời gian chuẩn bị · ' + fmtTime(rp.prep) + "</div>" +
      '<ul class="cue-list"><li><strong>Mục đích lượt ' + rp.n + ":</strong> " + rp.purpose + ".</li>" +
      "<li>✅ <strong>" + esc(ag ? teamName(parts[ag === "A" ? 0 : 1]) : "—") + "</strong> (Đồng tình) sẽ phát biểu trước — " + fmtTime(rp.speak) + ".</li>" +
      "<li>⛔ <strong>" + esc(dg ? teamName(parts[dg === "A" ? 0 : 1]) : "—") + "</strong> (Phản đối) sẽ phát biểu sau — " + fmtTime(rp.speak) + ".</li></ul>" +
      '<p class="hint">Bấm <strong>Bắt đầu</strong> ở đồng hồ bên phải. Chủ đề: “' + esc(config.finalTopic.trim() || "[Để trống]") + '”</p></div>';
  }

  if (ph.key === "speak") {
    var rs = DEBATE_ROUNDS[ph.round - 1];
    var sd = sideForStance(ms, ph.stance);
    var sName = sd ? teamName(parts[sd === "A" ? 0 : 1]) : "—";
    var cueS =
      ph.round === 1 ? '<ul class="cue-list"><li>Nêu rõ luận điểm chính của phe mình.</li><li>Đưa luận cứ/dẫn chứng thuyết phục nhất.</li></ul>' :
      ph.round === 4 ? '<ul class="cue-list"><li>Tổng kết các luận điểm mạnh nhất qua 3 lượt.</li><li>Khẳng định lại lập trường và thông điệp chốt.</li></ul>' :
      '<ul class="cue-list"><li>Chỉ ra điểm chưa thuyết phục trong lập luận của đối thủ.</li><li>Bảo vệ và củng cố luận điểm của phe mình bằng dẫn chứng.</li></ul>';
    return '<div class="present-box"><div class="present-role">Lượt ' + ph.round + " · " + rs.purpose + " · Phe " + stanceLabel(ph.stance) + "</div>" +
      '<div class="present-team">' + esc(sName) + "</div>" + cueS + "</div>";
  }

  if (ph.key === "vote") {
    var counts = voteCounts(ms);
    var slots = "";
    for (var i = 0; i < 7; i++) {
      var v = ms.votes[i];
      slots += '<div class="vote-slot' + (v ? " " + v.toLowerCase() : "") + '" title="Giám khảo ' + (i + 1) + '">' + (v === "A" ? "X" : v === "B" ? "Đ" : (i + 1)) + "</div>";
    }
    var full = ms.votes.length >= 7;
    return '<div class="vote-slots">' + slots + '</div>' +
      '<p class="hint" style="text-align:center">Mỗi vòng tròn là 1 giám khảo trong 7 người có quyền vote ở trận này (X = phiếu XANH, Đ = phiếu ĐỎ). Đã ghi <strong>' + ms.votes.length + '/7</strong> phiếu.</p>' +
      '<div class="vote-actions">' +
      '<button type="button" class="vote-btn a" data-vote="A"' + (full ? ' disabled' : '') + '><span class="vote-count-big">' + counts.A + '</span>+ 1 phiếu cho ' + esc(nA) + ' (XANH)</button>' +
      '<button type="button" class="vote-btn b" data-vote="B"' + (full ? ' disabled' : '') + '><span class="vote-count-big">' + counts.B + '</span>+ 1 phiếu cho ' + esc(nB) + ' (ĐỎ)</button></div>' +
      '<div class="center-actions"><button type="button" class="ghost-btn" data-undo-vote' + (ms.votes.length ? '' : ' disabled') + '>↩ Hoàn phiếu vừa ghi</button>' +
      '<button type="button" class="danger-ghost-btn" data-reset-votes' + (ms.votes.length ? '' : ' disabled') + '>Xóa hết phiếu</button>' +
      '<button type="button" class="primary-btn big" data-finish-vote' + (full ? '' : ' disabled') + '>🏁 Chốt đội thắng</button></div>' +
      (ms.winner != null ? '<p class="hint" style="text-align:center">Trận đã chốt kết quả. Nếu sửa phiếu, kết quả và các vòng sau liên quan sẽ được đặt lại.</p>' : '');
  }

  if (ph.key === "result") {
    if (ms.winner == null)
      return '<div class="result-box"><p>Chưa chốt đội thắng.</p><p class="hint">Hãy quay lại bước Bình chọn, ghi đủ 7 phiếu rồi bấm “Chốt đội thắng”.</p>' +
        '<div class="center-actions"><button type="button" class="primary-btn" data-goto-vote>← Về bước Bình chọn</button></div></div>';
    var cc = voteCounts(ms);
    var wSide = (ms.winner === parts[0]) ? "A" : "B";
    var isFinal = def.type === "debate";
    var htmlR = '<div class="result-box"><div class="present-role">' + (isFinal ? "🏆 QUÁN QUÂN – ĐỘI CÔNG NHÂN SỐ" : "Đội thắng trận này") + "</div>" +
      '<div class="result-winner">' + esc(teamName(ms.winner)) + "</div>" +
      '<div class="result-score">🟦 ' + esc(nA) + " " + cc.A + " — " + cc.B + " " + esc(nB) + " 🟥</div>";
    if (def.type === "case") htmlR += '<p class="hint">Thẻ đã chọn: ' + esc(nA) + " chọn <strong>" + (ms.picks.A.join(" + ") || "—") + "</strong> · " + esc(nB) + " chọn <strong>" + (ms.picks.B.join(" + ") || "—") + "</strong>.</p>";
    if (isFinal) htmlR += '<p class="hint">Đội quán quân thuộc phe <strong>' + stanceLabel(stanceOfSide(ms, wSide)) + "</strong> và là đội thể hiện tốt nhất khả năng lựa chọn năng lực, lập luận và vận dụng vào thực tiễn lao động thời đại số. 🎉</p>";
    else htmlR += '<p class="hint">' + esc(teamName(ms.winner)) + " đã được tự động đưa lên vòng tiếp theo trên sơ đồ đấu.</p>";
    var next = nextPlayableMatch();
    htmlR += '<div class="center-actions"><button type="button" class="secondary-btn big" data-nav="bracket">🏆 Xem sơ đồ đấu</button>' +
      (next && next !== def.id ? '<button type="button" class="primary-btn big" data-open-match="' + next + '">Trận tiếp theo: ' + esc(matchDef(next).title) + " →</button>" : "") +
      "</div></div>";
    return htmlR;
  }
  return "";
}
function nextPlayableMatch() {
  for (var i = 0; i < MATCH_DEFS.length; i++) {
    var d = MATCH_DEFS[i];
    if (matchState(d.id).winner == null && participantIndexes(d)) return d.id;
  }
  return null;
}

/* ---------------- Điều hướng & chuyển bước ---------------- */
function showView(name) {
  if (name !== "match") stopTimer();
  currentView = name;
  document.querySelectorAll(".view").forEach(function (v) { v.classList.remove("active"); });
  var el = $("#view-" + name); if (el) el.classList.add("active");
  document.querySelectorAll(".nav-btn").forEach(function (b) { b.classList.toggle("active", b.getAttribute("data-nav") === name); });
  if (name === "home") renderHome();
  if (name === "bracket") renderBracket();
  if (name === "match") renderMatch(true);
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function openMatch(id) {
  var def = matchDef(id);
  if (!def) return;
  if (!participantIndexes(def)) { toast("Trận này chưa xác định đủ 2 đội."); return; }
  tstate.currentMatchId = id; saveState();
  showView("match");
}
function goPhase(delta) {
  var def = currentDef(); if (!def) return;
  var ms = matchState(def.id), phases = buildPhases(def), cur = phases[ms.phase];
  if (delta > 0) {
    if (cur.key === "stance" && !ms.stanceA) { toast("🎲 Hãy bốc thăm phe trước khi sang bước tiếp!"); return; }
    if (cur.key === "discuss" && def.type === "case" && (ms.picks.A.length !== 2 || ms.picks.B.length !== 2)) {
      if (!confirm("Chưa nhập đủ đúng 2 thẻ cho cả hai đội trên web. Nếu các đội đã giơ thẻ giấy rồi, bạn có thể tiếp tục và quay lại nhập bổ sung sau. Tiếp tục?")) return;
    }
    if (cur.key === "vote" && ms.winner == null) {
      toast(ms.votes.length < 7 ? "🗳 Cần ghi đủ 7 phiếu rồi bấm “Chốt đội thắng”." : "Hãy bấm “Chốt đội thắng” để sang kết quả.");
      return;
    }
  }
  var next = Math.min(phases.length - 1, Math.max(0, ms.phase + delta));
  if (next === ms.phase) return;
  ms.phase = next; saveState();
  renderMatch(true);
}
function finishVote() {
  var def = currentDef(); if (!def) return;
  var ms = matchState(def.id);
  if (ms.votes.length !== 7) { toast("Cần đủ 7 phiếu."); return; }
  var parts = participantIndexes(def), counts = voteCounts(ms);
  var winnerIdx = counts.A > counts.B ? parts[0] : parts[1];
  var changed = (ms.winner !== null && ms.winner !== winnerIdx);
  if (changed) downstreamOf(def.id).forEach(function (did) { tstate.matches[did] = blankMatchState(); });
  ms.winner = winnerIdx;
  var phases = buildPhases(def);
  ms.phase = phases.length - 1;
  saveState();
  renderBracket(); renderHome(); renderMatch(true);
  toast("🏁 " + teamName(winnerIdx) + " thắng với tỉ số " + counts.A + "–" + counts.B + "!");
  if (def.type === "debate") launchConfetti();
}

/* ---------------- Pháo giấy ---------------- */
function launchConfetti() {
  var box = $("#confetti");
  var colors = ["#22d3ee", "#38bdf8", "#fbbf24", "#f43f5e", "#34d399", "#a78bfa", "#ffffff"];
  var html = "";
  for (var i = 0; i < 110; i++) {
    html += '<i style="left:' + (Math.random() * 100) + "%;background:" + colors[i % colors.length] +
      ";animation-duration:" + (2.4 + Math.random() * 2.2) + "s;animation-delay:" + (Math.random() * 0.9) + 's"></i>';
  }
  box.innerHTML = html; box.classList.remove("hidden");
  setTimeout(function () { box.classList.add("hidden"); box.innerHTML = ""; }, 5200);
}

/* ---------------- Soạn nội dung ---------------- */
function renderEditor() {
  var tWrap = $("#editorTeams");
  tWrap.innerHTML = "";
  config.teams.forEach(function (t, i) {
    var div = document.createElement("div");
    div.className = "editor-team";
    div.innerHTML = "<strong>Đội " + (i + 1) + '</strong><label>Tên đội</label><input type="text" data-team="' + i + '" data-field="name" placeholder="Ví dụ: Đội Bứt Phá"><label>Ngành học (dùng ở Vòng 2 – My Major)</label><input type="text" data-team="' + i + '" data-field="major" placeholder="[Để trống — ví dụ: Công nghệ thông tin]">';
    tWrap.appendChild(div);
    div.querySelector('[data-field="name"]').value = t.name;
    div.querySelector('[data-field="major"]').value = t.major;
  });
  var pairLabels = ["Cặp Đội 1 – Đội 2", "Cặp Đội 3 – Đội 4", "Cặp Đội 5 – Đội 6", "Cặp Đội 7 – Đội 8"];
  var cWrap = $("#editorCases");
  cWrap.innerHTML = "";
  config.cases.forEach(function (c, i) {
    var div = document.createElement("div");
    div.className = "editor-case";
    div.innerHTML = "<h4>Trường hợp " + (i + 1) + " · " + pairLabels[i] + "</h4>" +
      '<label>Tiêu đề trường hợp</label><input type="text" data-case="' + i + '" data-field="title" placeholder="[Để trống — BTC bổ sung]">' +
      '<label>Nội dung trường hợp thực tế</label><textarea rows="7" data-case="' + i + '" data-field="content" placeholder="[Để trống — dán toàn văn trường hợp thực tế vào đây]"></textarea>' +
      '<label>Nguồn xác nhận (tên báo/tổ chức hoặc đường link)</label><input type="text" data-case="' + i + '" data-field="source" placeholder="[Để trống — ví dụ: https://... hoặc Báo X, ngày ...]">' +
      '<label>Link ảnh minh họa (không bắt buộc)</label><input type="text" data-case="' + i + '" data-field="image" placeholder="https://...">';
    cWrap.appendChild(div);
    div.querySelector('[data-field="title"]').value = c.title;
    div.querySelector('[data-field="content"]').value = c.content;
    div.querySelector('[data-field="source"]').value = c.source;
    div.querySelector('[data-field="image"]').value = c.image;
  });
  $("#editorTopic").value = config.finalTopic;
}
function exportJSON() {
  var data = { app: "cong-nhan-so", version: 1, exportedAt: new Date().toISOString(), config: config, tournament: tstate };
  var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  var a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "cong-nhan-so-du-lieu.json";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(function () { URL.revokeObjectURL(a.href); }, 1500);
  toast("⬇ Đã xuất file dữ liệu.");
}
function importJSON(file) {
  var reader = new FileReader();
  reader.onload = function () {
    try {
      var obj = JSON.parse(reader.result);
      if (!obj || !obj.config) throw new Error("bad");
      config = sanitizeConfig(obj.config);
      if (obj.tournament) tstate = sanitizeState(obj.tournament);
      saveConfig(true); saveState();
      renderEditor(); renderHome(); renderBracket();
      toast("⬆ Nhập dữ liệu thành công!");
    } catch (e) { toast("⚠️ File không hợp lệ — hãy dùng file JSON do chính web này xuất ra."); }
  };
  reader.readAsText(file);
}
function resetResults() {
  if (!confirm("Đặt lại toàn bộ kết quả thi đấu, phiếu bầu và thẻ đã chọn? Nội dung đề thi vẫn được giữ nguyên.")) return;
  tstate = defaultState(); saveState(); stopTimer();
  renderHome(); renderBracket(); renderMatch(true);
  toast("↺ Đã đặt lại kết quả thi đấu.");
}
function resetContent() {
  if (!confirm("Xóa trống toàn bộ tên đội, ngành học, 4 trường hợp và chủ đề về mặc định? Hành động này không hoàn tác được.")) return;
  config = defaultConfig(); saveConfig(true);
  renderEditor(); renderHome(); renderBracket();
  toast("🧹 Đã xóa trống nội dung về mặc định.");
}

/* ---------------- Sự kiện ---------------- */
document.addEventListener("click", function (e) {
  var navEl = e.target.closest("[data-nav]");
  if (navEl) { showView(navEl.getAttribute("data-nav")); return; }

  var openEl = e.target.closest("[data-open-match]");
  if (openEl && !openEl.disabled) { openMatch(openEl.getAttribute("data-open-match")); return; }

  var def = currentDef();

  var pickEl = e.target.closest("[data-pick-letter]");
  if (pickEl && def) {
    var side = pickEl.getAttribute("data-pick-side"), letter = pickEl.getAttribute("data-pick-letter");
    var msP = matchState(def.id), arr = msP.picks[side], pos = arr.indexOf(letter);
    if (pos >= 0) arr.splice(pos, 1);
    else {
      if (def.type === "case" && arr.length >= 2) { toast("Mỗi đội chọn đúng 2 thẻ. Bấm lại thẻ đã chọn để bỏ."); return; }
      arr.push(letter); arr.sort();
    }
    saveState(); renderMatch(false);
    return;
  }

  var voteEl = e.target.closest("[data-vote]");
  if (voteEl && def && !voteEl.disabled) {
    var msV = matchState(def.id);
    if (msV.winner != null) clearWinner(def.id);
    if (msV.votes.length < 7) msV.votes.push(voteEl.getAttribute("data-vote"));
    saveState(); renderMatch(false);
    return;
  }
  if (e.target.closest("[data-undo-vote]") && def) {
    var msU = matchState(def.id);
    if (msU.winner != null) clearWinner(def.id);
    msU.votes.pop(); saveState(); renderMatch(false); return;
  }
  if (e.target.closest("[data-reset-votes]") && def) {
    var msR = matchState(def.id);
    if (msR.winner != null) clearWinner(def.id);
    msR.votes = []; saveState(); renderBracket(); renderMatch(false); return;
  }
  if (e.target.closest("[data-finish-vote]")) { finishVote(); return; }
  if (e.target.closest("[data-goto-vote]") && def) {
    var msG = matchState(def.id), phs = buildPhases(def);
    for (var i = 0; i < phs.length; i++) if (phs[i].key === "vote") { msG.phase = i; break; }
    saveState(); renderMatch(true); return;
  }
  if (e.target.closest("[data-draw-stance]") && def && !drawingStance) {
    drawingStance = true; renderMatch(false); beep(523, 0.1);
    setTimeout(function () {
      drawingStance = false;
      matchState(def.id).stanceA = Math.random() < 0.5 ? "agree" : "disagree";
      saveState(); renderMatch(false); beep(1046, 0.2);
      var parts = participantIndexes(def), agSide = sideForStance(matchState(def.id), "agree");
      toast("🎲 " + teamName(parts[agSide === "A" ? 0 : 1]) + " thuộc phe ĐỒNG TÌNH!");
    }, 950);
    return;
  }
  if (e.target.closest("[data-swap-stance]") && def) {
    var msS = matchState(def.id);
    if (msS.stanceA) { msS.stanceA = (msS.stanceA === "agree") ? "disagree" : "agree"; saveState(); renderMatch(false); }
    return;
  }
});

$("#btnTimerToggle").addEventListener("click", function () { toggleTimer(); this.blur(); });
$("#btnTimerReset").addEventListener("click", function () { setTimer(timer.dur); this.blur(); });
$("#btnTimerPlus").addEventListener("click", function () { adjustTimer(10); this.blur(); });
$("#btnTimerMinus").addEventListener("click", function () { adjustTimer(-10); this.blur(); });
$("#btnPrevPhase").addEventListener("click", function () { goPhase(-1); this.blur(); });
$("#btnNextPhase").addEventListener("click", function () { goPhase(1); this.blur(); });
$("#btnFullscreen").addEventListener("click", toggleFullscreen);
$("#btnResetResults").addEventListener("click", resetResults);
$("#btnResetResults2").addEventListener("click", resetResults);
$("#btnResetContent").addEventListener("click", resetContent);
$("#btnExport").addEventListener("click", exportJSON);
$("#btnImport").addEventListener("click", function () { $("#importFile").click(); });
$("#importFile").addEventListener("change", function () {
  if (this.files && this.files[0]) importJSON(this.files[0]);
  this.value = "";
});

document.addEventListener("input", function (e) {
  var t = e.target;
  if (t.hasAttribute && t.hasAttribute("data-team")) {
    config.teams[+t.getAttribute("data-team")][t.getAttribute("data-field")] = t.value;
    saveConfig(true); return;
  }
  if (t.hasAttribute && t.hasAttribute("data-case")) {
    config.cases[+t.getAttribute("data-case")][t.getAttribute("data-field")] = t.value;
    saveConfig(true); return;
  }
  if (t.id === "editorTopic") { config.finalTopic = t.value; saveConfig(true); }
});

function toggleFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen().catch(function () {});
  else document.documentElement.requestFullscreen().catch(function () { toast("Trình duyệt không cho phép toàn màn hình tự động."); });
}
document.addEventListener("keydown", function (e) {
  var tag = (e.target.tagName || "").toLowerCase();
  if (tag === "input" || tag === "textarea" || tag === "select" || e.target.isContentEditable) return;
  if (e.key === "f" || e.key === "F") { toggleFullscreen(); return; }
  if (currentView !== "match") return;
  if (e.code === "Space") { e.preventDefault(); toggleTimer(); }
  else if (e.key === "ArrowRight") goPhase(1);
  else if (e.key === "ArrowLeft") goPhase(-1);
  else if (e.key === "r" || e.key === "R") setTimer(timer.dur);
});
document.querySelector(".brand").addEventListener("keydown", function (e) {
  if (e.key === "Enter") showView("home");
});

/* ---------------- Khởi tạo ---------------- */
renderHome();
renderBracket();
renderEditor();
renderMatch(true);
