/* ============================================================
   CÔNG NHÂN SỐ – Chọn năng lực, giải bài toán
   Web điều hành trò chơi (thuần HTML/CSS/JS, chạy offline).
   - Đề bài Vòng 1 và chủ đề Vòng 3 được đưa sẵn vào code;
     tên đội, kết quả bốc thăm và tiến trình lưu ở localStorage.
   ============================================================ */
"use strict";

/* ---------------- Hằng số ---------------- */
var CARDS = [
  { letter: "A", name: "Chuyên môn, tay nghề", desc: "Hiểu nghiệp vụ, quy trình, tiêu chuẩn", color: "#0284c7" },
  { letter: "B", name: "Năng lực số & ứng dụng công nghệ", desc: "Sử dụng thiết bị, phần mềm, dữ liệu, AI", color: "#0d9488" },
  { letter: "C", name: "Tư duy phản biện & giải quyết vấn đề", desc: "Kiểm chứng, phân tích, xử lý tình huống", color: "#7c3aed" },
  { letter: "D", name: "Tự học & thích ứng", desc: "Học kỹ năng mới, chuyển đổi nhiệm vụ", color: "#16a34a" },
  { letter: "E", name: "Giao tiếp, hợp tác & ngoại ngữ", desc: "Phối hợp, trao đổi, tiếp cận tài liệu", color: "#d97706" },
  { letter: "F", name: "Tác phong, trách nhiệm & ý thức quyền lợi", desc: "Kỷ luật, đạo đức, an toàn và quyền lợi", color: "#e11d48" }
];

var MATCH_DEFS = [
  { id: "R1M1", type: "case",  round: "Vòng 1 · Phân tích thực tế", title: "Trận 1 – Vòng bảng", short: "Trận 1", caseIndex: 0 },
  { id: "R1M2", type: "case",  round: "Vòng 1 · Phân tích thực tế", title: "Trận 2 – Vòng bảng", short: "Trận 2", caseIndex: 1 },
  { id: "R1M3", type: "case",  round: "Vòng 1 · Phân tích thực tế", title: "Trận 3 – Vòng bảng", short: "Trận 3", caseIndex: 2 },
  { id: "R1M4", type: "case",  round: "Vòng 1 · Phân tích thực tế", title: "Trận 4 – Vòng bảng", short: "Trận 4", caseIndex: 3 },
  { id: "R2M1", type: "major", round: "Vòng 2 · My Major, My Future", title: "Bán kết 1", short: "BK1", r2Index: 0 },
  { id: "R2M2", type: "major", round: "Vòng 2 · My Major, My Future", title: "Bán kết 2", short: "BK2", r2Index: 1 },
  { id: "F1",   type: "debate", round: "Vòng 3 · The Final Debate", title: "CHUNG KẾT", short: "CK" }
];

/* 6 ngành học cho dropdown Vòng 2 */
var MAJORS = [
  "Ngành Công nghệ thông tin",
  "Ngành Công nghệ truyền thông",
  "Khối Ngành Ngôn ngữ",
  "Ngành Luật",
  "Ngành Quản trị kinh doanh",
  "Ngành Khoa học máy tính"
];

/* Đề bài Vòng 1 — nội dung điều chỉnh, đưa sẵn vào web */
var CASES = [
  {
    title: "Từ giấy tờ sang hệ thống quản lý sản xuất số",
    content: "Một doanh nghiệp dệt may đang từng bước chuyển đổi phương thức quản lý sản xuất từ ghi chép thủ công sang hệ thống quản lý dữ liệu điện tử.\n\nTrước đây, nhiều thông tin về nguyên phụ liệu, tiến độ sản xuất, năng suất và chất lượng sản phẩm được ghi nhận bằng giấy tờ hoặc bảng tính thủ công.\n\nHiện nay, doanh nghiệp đưa vào sử dụng hệ thống quản lý sản xuất MES, kết hợp mã QR và các công cụ số để cập nhật, theo dõi thông tin tại kho nguyên phụ liệu, tổ cắt, chuyền may và kho thành phẩm.\n\nSự thay đổi này khiến người lao động không chỉ thực hiện công việc chuyên môn mà còn phải tiếp cận với thiết bị, phần mềm và quy trình cập nhật dữ liệu mới.",
    source: "", image: ""
  },
  {
    title: "Khi AI tham gia kiểm tra chất lượng sản phẩm",
    content: "Trong một dây chuyền sản xuất, doanh nghiệp đưa vào thử nghiệm hệ thống kiểm tra chất lượng sử dụng camera kết hợp trí tuệ nhân tạo.\n\nHệ thống có khả năng ghi nhận hình ảnh sản phẩm, đối chiếu với dữ liệu được thiết lập và phát hiện những dấu hiệu sai lệch trong quá trình sản xuất.\n\nMột số công đoạn kiểm tra lỗi bằng mắt thường trước đây có thể được thực hiện tự động. Hệ thống có khả năng xử lý mỗi sản phẩm trong thời gian rất ngắn và hỗ trợ phát hiện lỗi với độ chính xác cao.\n\nTuy nhiên, công nghệ vẫn có những giới hạn nhất định, đặc biệt đối với các vị trí sản phẩm khó quan sát hoặc những lỗi cần đánh giá chuyên môn.\n\nĐiều này đặt ra yêu cầu mới đối với người lao động trong lĩnh vực kiểm tra chất lượng: thay vì chỉ thực hiện thao tác quan sát thủ công, họ cần biết phối hợp với hệ thống và xử lý những tình huống công nghệ chưa thể giải quyết hoàn toàn.",
    source: "", image: ""
  },
  {
    title: "Khi nhà máy chuyển sang mô hình sản xuất số",
    content: "Một doanh nghiệp sản xuất cáp công nghệ cao đang chuyển đổi từ phương thức quản lý thủ công sang mô hình nhà máy số.\n\nTrong mô hình mới, các thiết bị sản xuất được kết nối với hệ thống quản lý thông qua công nghệ IoT. Dữ liệu về tình trạng máy móc, tiến độ sản xuất và chất lượng sản phẩm được thu thập, cập nhật và theo dõi trên hệ thống.\n\nThông tin sản xuất có thể được truy xuất bằng mã QR, giúp các bộ phận và ca làm việc tiếp nhận dữ liệu thuận tiện hơn.\n\nTuy nhiên, phương thức làm việc mới cũng đòi hỏi người lao động phải cập nhật thông tin chính xác, thực hiện bàn giao công việc đầy đủ và phối hợp chặt chẽ với các bộ phận liên quan.",
    source: "", image: ""
  },
  {
    title: "Tài xế công nghệ và những thách thức nghề nghiệp",
    content: "Trong nền kinh tế số, nhiều người lao động lựa chọn công việc tài xế công nghệ thông qua các nền tảng gọi xe và giao hàng.\n\nCông việc được điều phối thông qua ứng dụng điện thoại, trong đó hệ thống hỗ trợ tiếp nhận đơn hàng, xác định lộ trình, theo dõi hoạt động và đánh giá hiệu suất làm việc.\n\nTuy nhiên, một khảo sát đối với nhóm tài xế công nghệ tại Việt Nam cho thấy:\n\n- 35,5% người được hỏi cho biết thường xuyên làm việc hơn 10 giờ mỗi ngày.\n- 73,8% từng gặp ít nhất một vụ va chạm hoặc tai nạn giao thông.\n- 87,9% mong muốn có cơ chế phù hợp để tham gia bảo hiểm xã hội và được hỗ trợ.\n\nNhững vấn đề này cho thấy bên cạnh khả năng sử dụng nền tảng số, người lao động còn phải đối mặt với áp lực thời gian, rủi ro nghề nghiệp và những vấn đề liên quan đến quyền lợi, an sinh xã hội.",
    source: "", image: ""
  }
];

var DEBATE_ROUNDS = [
  { n: 1, purpose: "Trình bày luận điểm", prep: 120, speak: 60 },
  { n: 2, purpose: "Phản biện lần 1",     prep: 90,  speak: 60 },
  { n: 3, purpose: "Phản biện lần 2",     prep: 90,  speak: 60 },
  { n: 4, purpose: "Tổng kết",            prep: 90,  speak: 90 }
];

var FINAL_TOPIC = "Trong thời đại số hiện nay, AI đang có xu hướng thay thế người lao động thay vì chỉ hỗ trợ họ làm việc";
var LS_CONFIG = "cns_config_v2";
var LS_STATE = "cns_state_v2";
var RING_C = 552.92;

/* ---------------- Trạng thái ---------------- */
function defaultConfig() {
  var teams = [], i;
  for (i = 0; i < 8; i++) teams.push({ name: "Đội " + (i + 1) });
  return { teams: teams };
}
function blankMatchState() {
  return { phase: 0, winner: null, votes: [], picks: { A: [], B: [] }, stanceA: null, majorA: "", majorB: "" };
}
function sequentialPairs() { return [[0, 1], [2, 3], [4, 5], [6, 7]]; }
function defaultState() {
  var m = {};
  MATCH_DEFS.forEach(function (d) { m[d.id] = blankMatchState(); });
  return { matches: m, currentMatchId: null, draw: { r1: sequentialPairs(), r2: null, r1Drawn: false, r2Drawn: false } };
}
function sanitizeConfig(c) {
  var d = defaultConfig(), i;
  if (!c || typeof c !== "object") return d;
  if (Array.isArray(c.teams)) for (i = 0; i < 8; i++) if (c.teams[i]) {
    d.teams[i].name = String(c.teams[i].name == null ? "" : c.teams[i].name);
  }
  return d;
}
function sanitizePairs(pairs, count, maxIdx) {
  if (!Array.isArray(pairs) || pairs.length !== count) return null;
  var seen = {}, out = [];
  for (var i = 0; i < pairs.length; i++) {
    var p = pairs[i];
    if (!Array.isArray(p) || p.length !== 2) return null;
    for (var j = 0; j < 2; j++) {
      if (!Number.isInteger(p[j]) || p[j] < 0 || p[j] > maxIdx || seen[p[j]]) return null;
      seen[p[j]] = 1;
    }
    out.push([p[0], p[1]]);
  }
  return out;
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
    if (MAJORS.indexOf(m.majorA) >= 0) t.majorA = m.majorA;
    if (MAJORS.indexOf(m.majorB) >= 0) t.majorB = m.majorB;
  });
  if (s.currentMatchId && d.matches[s.currentMatchId]) d.currentMatchId = s.currentMatchId;
  if (s.draw) {
    var r1 = sanitizePairs(s.draw.r1, 4, 7);
    if (r1) d.draw.r1 = r1;
    d.draw.r2 = sanitizePairs(s.draw.r2, 2, 7); /* null nếu chưa bốc thăm */
    var anyMatchProgress = MATCH_DEFS.some(function (def) {
      var m = d.matches[def.id];
      return m.winner != null || m.votes.length || m.picks.A.length || m.picks.B.length || m.phase > 0 || m.stanceA || m.majorA || m.majorB;
    });
    /* Trạng thái lưu từ bản cũ chưa có cờ đã bốc thăm: suy ra từ tiến trình/cặp đã xáo trộn để khóa nút đúng một lần. */
    var r1LooksDrawn = JSON.stringify(d.draw.r1) !== JSON.stringify(sequentialPairs());
    d.draw.r1Drawn = (typeof s.draw.r1Drawn === "boolean") ? s.draw.r1Drawn : (anyMatchProgress || r1LooksDrawn || !!d.draw.r2);
    d.draw.r2Drawn = !!d.draw.r2;
  }
  return d;
}
function loadJSON(key, fallback) {
  try { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback(); }
  catch (e) { return fallback(); }
}
var config = sanitizeConfig(loadJSON(LS_CONFIG, function () {
  /* Chuyển tiếp từ bản cũ: chỉ giữ lại tên đội đã nhập (nếu có) */
  return loadJSON("cns_config_v1", defaultConfig);
}));
var tstate = sanitizeState(loadJSON(LS_STATE, defaultState));
var currentView = "home";
var drawingStance = false;
var drawingPairRound = null;
var pairDrawTimeout = null;

function saveConfig() {
  try { localStorage.setItem(LS_CONFIG, JSON.stringify(config)); } catch (e) {}
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
function matchMajor(ms, side) { return (side === "A" ? ms.majorA : ms.majorB) || ""; }
function r1WinnerIndexes() {
  var out = [];
  ["R1M1", "R1M2", "R1M3", "R1M4"].forEach(function (id) {
    var w = matchState(id).winner;
    if (w != null) out.push(w);
  });
  return out;
}
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

/* Đội tham dự một trận theo kết quả bốc thăm.
   Trả về [{idx,label,advanced},{...}] (idx=null nếu chưa xác định).
   advanced=true khi đội ở ô này là đội thắng của vòng trước. */
function participantSlots(def) {
  function slot(idx, advanced) { return { idx: idx, label: teamName(idx), advanced: !!advanced }; }
  if (def.type === "case") {
    var pair = (tstate.draw && tstate.draw.r1 && tstate.draw.r1[def.caseIndex]) || sequentialPairs()[def.caseIndex];
    return [slot(pair[0], false), slot(pair[1], false)];
  }
  if (def.type === "major") {
    if (tstate.draw && tstate.draw.r2) {
      var p2 = tstate.draw.r2[def.r2Index];
      return [slot(p2[0], true), slot(p2[1], true)];
    }
    var needDraw = r1WinnerIndexes().length === 4;
    return [
      { idx: null, label: needDraw ? "Chờ bốc thăm Vòng 2" : "Thắng Vòng 1", advanced: false },
      { idx: null, label: needDraw ? "Chờ bốc thăm Vòng 2" : "Thắng Vòng 1", advanced: false }
    ];
  }
  /* Chung kết: đội thắng hai trận bán kết */
  return ["R2M1", "R2M2"].map(function (fid) {
    var w = matchState(fid).winner;
    return (w == null) ? { idx: null, label: "Thắng " + matchDef(fid).short, advanced: false } : slot(w, true);
  });
}
function participantIndexes(def) {
  var s = participantSlots(def);
  return (s[0].idx == null || s[1].idx == null) ? null : [s[0].idx, s[1].idx];
}
/* Xóa các trận phía sau (và lượt bốc thăm Vòng 2) khi một kết quả thay đổi */
function clearDownstream(mid) {
  if (matchDef(mid).type === "case") {
    tstate.draw.r2 = null;
    tstate.draw.r2Drawn = false;
    ["R2M1", "R2M2", "F1"].forEach(function (did) { tstate.matches[did] = blankMatchState(); });
  } else if (matchDef(mid).type === "major") {
    tstate.matches.F1 = blankMatchState();
  }
}
function clearWinner(mid) {
  var ms = matchState(mid);
  if (ms.winner == null) return;
  ms.winner = null;
  clearDownstream(mid);
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
      desc: "Hai đội có 1 phút hội ý và chọn đúng 2 năng lực ưu tiên nhất." },
    { key: "present", side: "A", short: "Trình bày " + nA, timer: 60,
      title: "🎤 " + nA + " trình bày", desc: "Đội XANH trình bày trong 1 phút." },
    { key: "present", side: "B", short: "Trình bày " + nB, timer: 60,
      title: "🎤 " + nB + " trình bày", desc: "Đội ĐỎ trình bày trong 1 phút." },
    { key: "vote", short: "Bình chọn 30 giây", timer: 30,
      title: "🗳️ Bình chọn của 7 giám khảo",
      desc: "7 giám khảo có 30 giây suy nghĩ, sau đó giơ thẻ: XANH chọn " + nA + ", ĐỎ chọn " + nB + ". MC ghi từng phiếu vào bên dưới; đủ 7 phiếu mới chốt được kết quả." },
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
    { key: "vote", short: "Bình chọn 30 giây", timer: 30,
      title: "🗳️ Bình chọn của 7 giám khảo",
      desc: "7 giám khảo có 30 giây suy nghĩ, sau đó chọn đội có phần phân tích thuyết phục hơn. XANH = " + nA + " · ĐỎ = " + nB + "." },
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
  ph.push({ key: "vote", short: "Bình chọn 30 giây", timer: 30,
    title: "🗳️ Bình chọn chung kết",
    desc: "7 giám khảo có 30 giây suy nghĩ, sau đó bình chọn đội tranh biện thuyết phục hơn qua cả 4 lượt." });
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
      '<div class="tmajor">Đội thi số ' + (i + 1) + "</div></div>";
  }).join("");
  $("#homeCards").innerHTML = CARDS.map(function (c) {
    return '<article class="comp-card" style="--cc:' + c.color + '"><span class="comp-letter">' + c.letter +
      "</span><h4>" + esc(c.name) + "</h4><p>" + esc(c.desc) + "</p></article>";
  }).join("");
  $("#homeTopic").textContent = "“" + FINAL_TOPIC + "”";
  var done = completedCount(), champ = matchState("F1").winner;
  $("#homeProgress").innerHTML = champ != null
    ? "🏆 <strong>Quán quân: " + esc(teamName(champ)) + "</strong> · Giải đấu đã hoàn thành " + done + "/7 trận."
    : "Tiến độ giải đấu: <strong>" + done + "/7 trận</strong> đã có đội thắng.";
}

/* ---------------- Nhà vô địch ---------------- */
function championIndex() { return matchState("F1").winner; }
var championMusicStartedFor = null;
var championMusicRetry = 0;
var CHAMPION_MUSIC_PATH = "assets/we-are-the-champions-hook.mp3";
function championAudioEl() { return $("#championAudio"); }
function championMusicStatusEl() { return $("#championMusicStatus"); }
function championMusicErrorMessage(audio) {
  var code = audio && audio.error ? audio.error.code : null;
  var detail = code ? " (mã lỗi trình duyệt: " + code + ")" : "";
  return "Chưa tải được nhạc" + detail + ". File phải nằm đúng tại " + CHAMPION_MUSIC_PATH +
    " — kiểm tra thư mục assets và tên file phải chính xác là we-are-the-champions-hook.mp3, rồi bấm “Tải lại & phát nhạc”.";
}
function updateChampionMusicButton(message) {
  var btn = $("#btnChampionMusic"), audio = championAudioEl(), status = championMusicStatusEl();
  if (status) {
    if (message) status.textContent = message;
    else if (audio && audio.error) status.textContent = championMusicErrorMessage(audio);
    else if (audio && !audio.paused && !audio.ended) status.textContent = "";
    else if (status.textContent && audio && audio.readyState > 0) status.textContent = "";
  }
  if (!btn) return;
  /* Không khóa nút khi lỗi: người dùng có thể vừa bổ sung/đổi tên MP3 và bấm để web tải lại. */
  btn.disabled = false;
  if (audio && audio.error) btn.textContent = "↻ Tải lại & phát nhạc";
  else btn.textContent = audio && !audio.paused && !audio.ended ? "⏸ Tạm dừng nhạc" : "🔊 Phát nhạc vô địch";
}
function reloadChampionMusic(audio) {
  if (!audio) return;
  try {
    var base = (audio.getAttribute("src") || CHAMPION_MUSIC_PATH).split("?")[0];
    /* Khi chạy qua http(s), thêm tham số mới để tránh trình duyệt giữ kết quả 404 cũ trong cache. */
    if (/^https?:$/.test(window.location.protocol)) {
      championMusicRetry++;
      audio.src = base + "?retry=" + Date.now() + "-" + championMusicRetry;
    }
    audio.load();
  } catch (e) {}
}
function stopChampionMusic(resetPosition) {
  var audio = championAudioEl();
  if (!audio) return;
  try { audio.pause(); } catch (e) {}
  if (resetPosition) { try { audio.currentTime = 0; } catch (e) {} }
  updateChampionMusicButton();
}
function playChampionMusic(forceRestart) {
  var champ = championIndex(), audio = championAudioEl();
  if (champ == null || !audio) return;
  if (!forceRestart && championMusicStartedFor === champ && !audio.paused && !audio.ended) {
    updateChampionMusicButton();
    return;
  }
  championMusicStartedFor = champ;
  /* File có thể được thêm vào sau khi trang đã mở: luôn tải lại nếu lần tải trước bị lỗi. */
  if (audio.error || audio.networkState === 3) reloadChampionMusic(audio);
  try {
    audio.pause();
    try { audio.currentTime = 0; } catch (e) {}
    var promise = audio.play();
    if (promise && typeof promise.catch === "function") promise.catch(function (err) {
      var reason = err && err.name ? " (" + err.name + ")" : "";
      if (audio.error) updateChampionMusicButton(championMusicErrorMessage(audio));
      else updateChampionMusicButton("Trình duyệt chưa cho phát nhạc" + reason + ". Hãy bấm nút phát nhạc hoặc nút ▶ trên thanh âm thanh.");
    });
  } catch (e) {
    updateChampionMusicButton("Trình duyệt chưa cho phát nhạc. Hãy bấm nút ▶ trên thanh âm thanh.");
  }
  updateChampionMusicButton();
}
function toggleChampionMusic() {
  var audio = championAudioEl();
  if (audio && !audio.paused && !audio.ended && !audio.error) stopChampionMusic(false);
  else playChampionMusic(true);
}
function updateChampionUI() {
  var champ = championIndex();
  var nav = $("#navChampion");
  if (nav) nav.classList.toggle("hidden", champ == null);
  if (champ == null) { championMusicStartedFor = null; stopChampionMusic(true); }
  if (champ == null && currentView === "champion") showView("bracket");
}
function renderChampion() {
  var champ = championIndex();
  if (champ == null) { updateChampionUI(); return; }
  var def = matchDef("F1"), ms = matchState("F1"), parts = participantIndexes(def), counts = voteCounts(ms);
  $("#championTeamName").textContent = teamName(champ);
  var meta = "Nhà vô địch của trò chơi Công Nhân Số 🎉";
  if (parts) {
    var wSide = (champ === parts[0]) ? "A" : "B";
    var opp = teamName(parts[wSide === "A" ? 1 : 0]);
    meta = "Thắng " + opp + " với tỉ số " + counts.A + "–" + counts.B + " trong trận chung kết";
    var stance = stanceOfSide(ms, wSide);
    if (stance) meta += " · Phe " + stanceLabel(stance);
    meta += " 🎉";
  }
  $("#championMeta").textContent = meta;
  updateChampionUI();
  playChampionMusic(false);
}

/* ---------------- Render: Sơ đồ đấu ---------------- */
function matchStatus(def) {
  var ms = matchState(def.id);
  if (ms.winner != null) return { cls: "done", label: "ĐÃ XONG" };
  if (!participantIndexes(def)) {
    if (def.type === "major" && r1WinnerIndexes().length === 4) return { cls: "playing", label: "CHỜ BỐC THĂM" };
    return { cls: "", label: "Chờ đội thắng" };
  }
  if (ms.phase > 0 || ms.votes.length || ms.picks.A.length || ms.picks.B.length || ms.stanceA || ms.majorA || ms.majorB) return { cls: "playing", label: "ĐANG ĐẤU" };
  return { cls: "", label: "Sẵn sàng" };
}
function matchCardHTML(def) {
  var ms = matchState(def.id), slots = participantSlots(def), counts = voteCounts(ms), st = matchStatus(def);
  var ready = !!participantIndexes(def);
  function row(side, i) {
    var isWin = ms.winner != null && slots[i].idx === ms.winner;
    var cls = "m-team" + (isWin ? " win" : "") + (slots[i].advanced && !isWin ? " advanced" : "");
    return '<div class="' + cls + '"><span>' + (isWin ? "👑 " : (slots[i].advanced ? "⬆ " : "")) + esc(slots[i].label) + "</span>" +
      '<span class="side-tag side-' + side.toLowerCase() + '-tag">' + (side === "A" ? "XANH" : "ĐỎ") + "</span>" +
      (ms.votes.length ? '<span class="votes">' + counts[side] + "</span>" : "") + "</div>";
  }
  var btnLabel = ms.winner != null ? "Xem lại trận" : (st.cls === "playing" ? "Tiếp tục trận →" : "Vào trận →");
  return '<div class="match-card' + (ms.winner != null ? " done" : "") + ((slots[0].advanced || slots[1].advanced) ? " has-advanced" : "") + '">' +
    '<div class="m-title"><span>' + esc(def.title) + '</span><span class="badge ' + st.cls + '">' + st.label + "</span></div>" +
    '<div class="m-teams">' + row("A", 0) + row("B", 1) + "</div>" +
    '<button type="button" class="' + (ready ? "primary-btn" : "secondary-btn") + '" data-open-match="' + def.id + '"' + (ready ? "" : " disabled") + ">" + btnLabel + "</button></div>";
}
function renderBracket() {
  var cols = [
    { title: "VÒNG 1 · PHÂN TÍCH THỰC TẾ", ids: ["R1M1", "R1M2", "R1M3", "R1M4"], cls: "col-r1" },
    { title: "VÒNG 2 · MY MAJOR, MY FUTURE", ids: ["R2M1", "R2M2"], cls: "col-r2" },
    { title: "VÒNG 3 · THE FINAL DEBATE", ids: ["F1"], cls: "final-col col-final" }
  ];
  $("#bracketBoard").innerHTML = cols.map(function (c) {
    return '<div class="bracket-col ' + c.cls + '"><h3>' + c.title + '</h3><div class="bracket-col-body">' +
      c.ids.map(function (id) { return matchCardHTML(matchDef(id)); }).join("") + "</div></div>";
  }).join("");
  $("#bracketProgress").textContent = "Đã hoàn thành " + completedCount() + "/7 trận.";
  var champ = matchState("F1").winner, banner = $("#championBanner");
  if (champ != null) {
    banner.textContent = "🏆 QUÁN QUÂN – ĐỘI CÔNG NHÂN SỐ: " + teamName(champ).toUpperCase() + " 🎉";
    banner.classList.remove("hidden");
  } else banner.classList.add("hidden");
  updateDrawUI();
  updateChampionUI();
}
/* Danh sách 8 đội ở đầu trang Sơ đồ (đổi tên trực tiếp) */
function renderBracketTeams() {
  var wrap = $("#bracketTeams");
  if (!wrap) return;
  wrap.innerHTML = "";
  config.teams.forEach(function (t, i) {
    var div = document.createElement("div");
    div.className = "bracket-team-item";
    div.innerHTML = '<label for="teamNameInput' + i + '">Đội ' + (i + 1) + '</label>' +
      '<input type="text" id="teamNameInput' + i + '" data-team-name="' + i + '" placeholder="Tên đội ' + (i + 1) + '">';
    wrap.appendChild(div);
    div.querySelector("input").value = t.name;
  });
}
function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}
function isPairDrawn(round) {
  if (!tstate.draw) return false;
  return round === 1 ? !!tstate.draw.r1Drawn : !!(tstate.draw.r2Drawn || tstate.draw.r2);
}
function setPairDrawButton(btn, round, drawn, eligible) {
  if (!btn) return;
  var roundKey = round === 1 ? "r1" : "r2";
  var isDrawingThis = drawingPairRound === roundKey;
  btn.disabled = drawn || !!drawingPairRound || !eligible;
  btn.classList.toggle("primary-btn", !drawn);
  btn.classList.toggle("secondary-btn", drawn);
  btn.classList.toggle("is-drawn", drawn);
  btn.classList.toggle("is-drawing", isDrawingThis);
  btn.setAttribute("aria-busy", isDrawingThis ? "true" : "false");
  btn.textContent = isDrawingThis
    ? "🎲 Đang bốc thăm…"
    : drawn
      ? "✓ Đã bốc thăm chia cặp Vòng " + round
      : "🎲 Bốc thăm chia cặp Vòng " + round;
  btn.title = drawn
    ? "Đã bốc thăm Vòng " + round + " — mỗi nút chỉ bốc thăm một lần"
    : (!eligible && round === 2 ? "Bốc thăm Vòng 2 mở sau khi có đủ 4 đội thắng Vòng 1" : "");
}
function updateDrawUI() {
  var status = $("#drawStatus"), btn1 = $("#btnDrawR1"), btn2 = $("#btnDrawR2");
  if (!status || !btn1 || !btn2) return;
  var wins = r1WinnerIndexes();
  var r1Drawn = isPairDrawn(1), r2Drawn = isPairDrawn(2);
  setPairDrawButton(btn1, 1, r1Drawn, true);
  setPairDrawButton(btn2, 2, r2Drawn, wins.length === 4);
  if (drawingPairRound) {
    status.textContent = "🎲 Đang bốc thăm chia cặp " + (drawingPairRound === "r1" ? "Vòng 1" : "Vòng 2") + "…";
    return;
  }
  var r1Text = tstate.draw && tstate.draw.r1
    ? "Cặp Vòng 1: " + tstate.draw.r1.map(function (p) { return teamName(p[0]) + " – " + teamName(p[1]); }).join(" · ")
    : "";
  var r2Text;
  if (tstate.draw && tstate.draw.r2)
    r2Text = "Cặp Vòng 2: " + tstate.draw.r2.map(function (p) { return teamName(p[0]) + " – " + teamName(p[1]); }).join(" · ") + ".";
  else if (wins.length === 4)
    r2Text = "Đã có 4 đội thắng Vòng 1 — hãy bấm “Bốc thăm chia cặp Vòng 2”.";
  else
    r2Text = "Bốc thăm Vòng 2 sẽ mở sau khi có đủ 4 đội thắng Vòng 1 (hiện " + wins.length + "/4).";
  status.textContent = r1Text + "  |  " + r2Text;
}
function cancelPairDraw() {
  if (pairDrawTimeout) { clearTimeout(pairDrawTimeout); pairDrawTimeout = null; }
  drawingPairRound = null;
}
function beginPairDraw(roundKey, finalize) {
  if (drawingPairRound) return;
  drawingPairRound = roundKey;
  updateDrawUI();
  beep(523, 0.1);
  pairDrawTimeout = setTimeout(function () {
    pairDrawTimeout = null;
    drawingPairRound = null;
    finalize();
  }, 950);
}
function drawRound1() {
  if (drawingPairRound) return;
  if (isPairDrawn(1)) {
    updateDrawUI();
    toast("🎲 Vòng 1 đã bốc thăm rồi — mỗi nút chỉ được bấm một lần.");
    return;
  }
  var hasProgress = MATCH_DEFS.some(function (d) {
    var m = matchState(d.id);
    return m.winner != null || m.votes.length || m.picks.A.length || m.picks.B.length || m.phase > 0;
  });
  if (hasProgress && !confirm("Đã có tiến trình/kết quả thi đấu. Bốc thăm Vòng 1 sẽ đặt lại toàn bộ kết quả giải đấu. Tiếp tục?")) return;
  beginPairDraw("r1", function () {
    var order = shuffle([0, 1, 2, 3, 4, 5, 6, 7]);
    tstate = defaultState();
    tstate.draw.r1 = [[order[0], order[1]], [order[2], order[3]], [order[4], order[5]], [order[6], order[7]]];
    tstate.draw.r1Drawn = true;
    tstate.draw.r2Drawn = false;
    tstate.currentMatchId = null;
    saveState(); stopTimer();
    renderHome(); renderBracket(); renderMatch(true);
    beep(1046, 0.2);
    toast("🎲 Đã bốc thăm cặp Vòng 1: " + tstate.draw.r1.map(function (p) { return teamName(p[0]) + " – " + teamName(p[1]); }).join(" · "));
  });
}
function drawRound2() {
  if (drawingPairRound) return;
  if (isPairDrawn(2)) {
    updateDrawUI();
    toast("🎲 Vòng 2 đã bốc thăm rồi — mỗi nút chỉ được bấm một lần.");
    return;
  }
  var wins = r1WinnerIndexes();
  if (wins.length !== 4) { toast("Cần chốt đủ 4 trận Vòng 1 trước khi bốc thăm Vòng 2."); return; }
  beginPairDraw("r2", function () {
    var finalWins = r1WinnerIndexes();
    if (finalWins.length !== 4) { updateDrawUI(); return; }
    var order = shuffle(finalWins);
    tstate.draw.r2 = [[order[0], order[1]], [order[2], order[3]]];
    tstate.draw.r2Drawn = true;
    ["R2M1", "R2M2", "F1"].forEach(function (did) { tstate.matches[did] = blankMatchState(); });
    if (tstate.currentMatchId === "R2M1" || tstate.currentMatchId === "R2M2" || tstate.currentMatchId === "F1") tstate.currentMatchId = null;
    saveState(); stopTimer();
    renderBracket(); renderMatch(true);
    beep(1046, 0.2);
    toast("🎲 Đã bốc thăm cặp Vòng 2: " + tstate.draw.r2.map(function (p) { return teamName(p[0]) + " – " + teamName(p[1]); }).join(" · "));
  });
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
    if (def.type === "major") sub = matchMajor(ms, side) ? "🎓 " + esc(matchMajor(ms, side)) : '<span class="blank-note">[Chưa chọn ngành]</span>';
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
  updateChampionUI();
}
function chosenCardsHTML(ms, side) {
  var arr = ms.picks[side];
  if (!arr.length) return "";
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
function taskBoxHTML(title, items, ordered) {
  var tag = ordered === false ? "ul" : "ol";
  return '<div class="task-box"><h4>' + esc(title) + '</h4><' + tag + '>' +
    items.map(function (item) { return '<li>' + item + '</li>'; }).join("") + '</' + tag + '></div>';
}
function caseQuestionsHTML(includeChoice) {
  var questions = [];
  if (includeChoice) questions.push("Đội chọn hai năng lực nào?");
  questions.push("Vì sao ưu tiên hai năng lực đó cho trường hợp thực tế này?");
  questions.push("Vận dụng bằng những hành động cụ thể nào?");
  return taskBoxHTML("❓ Câu hỏi cần trả lời", questions.map(esc), true);
}
function majorQuestionsHTML(ms, side) {
  var selected = side ? (matchMajor(ms, side) || "ngành đội đã chọn") : "ngành học đội đã chọn";
  return taskBoxHTML("❓ Câu hỏi cần trả lời", [
    "Trong thời đại số, công việc hoặc yêu cầu lao động của ngành <strong>" + esc(selected) + "</strong> đang thay đổi như thế nào?",
    "Đề xuất các năng lực quan trọng, cần ưu tiên nhất để thích ứng trong ngành đó và giải thích vì sao."
  ], true);
}
function debateTasks(round) {
  if (round === 1) return [
    "Trình bày rõ luận điểm chính của phe mình.",
    "Đưa luận cứ và dẫn chứng thuyết phục để bảo vệ luận điểm."
  ];
  if (round === 4) return [
    "Tổng kết các luận điểm mạnh nhất của phe mình qua các lượt trước.",
    "Khẳng định lại lập trường và nêu thông điệp chốt."
  ];
  return [
    "Chỉ ra điểm chưa thuyết phục trong lập luận của đối thủ.",
    "Bảo vệ và củng cố quan điểm của phe mình bằng lý lẽ, dẫn chứng."
  ];
}
function phaseContentHTML(ph, def, ms, parts) {
  var nA = teamName(parts[0]), nB = teamName(parts[1]);

  if (ph.key === "intro" && def.type === "case") {
    var c = CASES[def.caseIndex];
    var html = '<div class="case-box"><h4>' + esc(c.title) + "</h4>" +
      '<div class="case-body">' + esc(c.content) + "</div>";
    if (c.image && isURL(c.image)) html += '<img class="case-img" src="' + esc(c.image) + '" alt="Ảnh minh họa trường hợp" onerror="this.remove()">';
    if (c.source) html += '<div class="case-source">📌 Nguồn xác nhận: ' +
      (isURL(c.source) ? '<a href="' + esc(c.source) + '" target="_blank" rel="noopener noreferrer">' + esc(c.source) + "</a>" : esc(c.source)) + "</div>";
    return html + "</div>" + caseQuestionsHTML(true);
  }

  if (ph.key === "intro" && def.type === "major") {
    function majorBox(idx, side) {
      var selected = matchMajor(ms, side);
      var options = '<option value="">— Chọn ngành học —</option>' + MAJORS.map(function (m) {
        return '<option value="' + esc(m) + '"' + (m === selected ? " selected" : "") + ">" + esc(m) + "</option>";
      }).join("");
      return '<div class="case-box major-pick"><h4>' + (side === "A" ? "🟦 " : "🟥 ") + esc(teamName(idx)) + "</h4>" +
        '<label class="major-label" for="majorSelect' + side + '">Ngành học đội lựa chọn</label>' +
        '<select id="majorSelect' + side + '" class="major-select" data-major-side="' + side + '">' + options + "</select>" +
        (selected ? '<div class="case-body">🎓 <strong>' + esc(selected) + "</strong></div>" : '<p class="hint">Đội chưa chọn ngành.</p>') + "</div>";
    }
    return '<div class="two-cols">' + majorBox(parts[0], "A") + majorBox(parts[1], "B") + "</div>" + majorQuestionsHTML(ms, null);
  }

  if (ph.key === "discuss") {
    if (def.type === "case")
      return caseQuestionsHTML(true) + '<div class="two-cols">' + pickColumnHTML(def, ms, parts, "A") + pickColumnHTML(def, ms, parts, "B") + "</div>";
    return majorQuestionsHTML(ms, null) + '<div class="two-cols">' + pickColumnHTML(def, ms, parts, "A") + pickColumnHTML(def, ms, parts, "B") + "</div>";
  }

  if (ph.key === "present") {
    var idxP = parts[ph.side === "A" ? 0 : 1];
    var cue = def.type === "case" ? caseQuestionsHTML(false) : majorQuestionsHTML(ms, ph.side);
    return '<div class="present-box"><div class="present-role">Đang trình bày</div><div class="present-team">' + esc(teamName(idxP)) + "</div>" +
      chosenCardsHTML(ms, ph.side) + cue + "</div>";
  }

  if (ph.key === "stance") {
    var topicHTML = '<div class="topic-box"><div class="hint">CHỦ ĐỀ TRANH BIỆN CHÍNH THỨC</div><div class="topic-text">“' + esc(FINAL_TOPIC) + '”</div></div>';
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
    var tasks = debateTasks(ph.round);
    function prepCard(kind, side, label, order) {
      var name = side ? teamName(parts[side === "A" ? 0 : 1]) : "—";
      return '<div class="prep-task-card ' + kind + '"><h4>' + label + '</h4>' +
        '<div class="prep-team">' + esc(name) + ' · phát biểu ' + order + ' (' + fmtTime(rp.speak) + ')</div>' +
        '<ul>' + tasks.map(function (task) { return '<li>' + esc(task) + '</li>'; }).join("") + '</ul></div>';
    }
    return '<div class="present-box"><div class="present-role">Thời gian chuẩn bị · ' + fmtTime(rp.prep) + "</div>" +
      '<p><strong>Mục đích lượt ' + rp.n + ':</strong> ' + esc(rp.purpose) + '.</p>' +
      '<div class="prep-task-grid">' +
        prepCard("agree", ag, "✅ Phe Đồng tình cần chuẩn bị", "trước") +
        prepCard("disagree", dg, "⛔ Phe Phản đối cần chuẩn bị", "sau") +
      '</div>' +
      '<p class="hint">Bấm <strong>Bắt đầu</strong> ở đồng hồ bên phải. Chủ đề: “' + esc(FINAL_TOPIC) + '”</p></div>';
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
    var next = nextPlayableMatch();
    htmlR += '<div class="center-actions">' +
      (isFinal ? '<button type="button" class="primary-btn big" data-nav="champion">🏆 Mở tab Nhà vô địch</button>' : "") +
      '<button type="button" class="secondary-btn big" data-nav="bracket">🏆 Xem sơ đồ đấu</button>' +
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
  if (name === "champion" && championIndex() == null) {
    toast("🏆 Tab Nhà vô địch sẽ mở sau khi chốt kết quả trận chung kết.");
    name = "bracket";
  }
  if (name !== "match") stopTimer();
  if (name !== "champion") stopChampionMusic(false);
  currentView = name;
  document.querySelectorAll(".view").forEach(function (v) { v.classList.remove("active"); });
  var el = $("#view-" + name); if (el) el.classList.add("active");
  document.querySelectorAll(".nav-btn").forEach(function (b) { b.classList.toggle("active", b.getAttribute("data-nav") === name); });
  if (name === "home") renderHome();
  if (name === "bracket") renderBracket();
  if (name === "match") renderMatch(true);
  if (name === "champion") renderChampion();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function openMatch(id) {
  if (drawingPairRound) { toast("🎲 Đang bốc thăm chia cặp, vui lòng chờ một chút…"); return; }
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
    if (cur.key === "intro" && def.type === "major" && (!ms.majorA || !ms.majorB)) { toast("🎓 Hãy chọn ngành học cho cả hai đội trước khi sang bước tiếp!"); return; }
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
  if (changed) clearDownstream(def.id);
  ms.winner = winnerIdx;
  var phases = buildPhases(def);
  ms.phase = phases.length - 1;
  saveState();
  renderBracket(); renderHome();
  if (def.type === "debate") {
    /* Vừa chốt chung kết: hiện tab Nhà vô địch và tự động chuyển tới đó */
    showView("champion");
    launchConfetti();
    toast("🏆 " + teamName(winnerIdx) + " là NHÀ VÔ ĐỊCH với tỉ số " + counts.A + "–" + counts.B + "!");
  } else {
    renderMatch(true);
    toast("🏁 " + teamName(winnerIdx) + " thắng với tỉ số " + counts.A + "–" + counts.B + "!");
  }
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

/* ---------------- Đặt lại giải đấu ---------------- */
function resetResults() {
  if (!confirm("Đặt lại toàn bộ kết quả thi đấu, phiếu bầu, thẻ đã chọn và kết quả bốc thăm chia cặp? Tên các đội vẫn được giữ nguyên.")) return;
  cancelPairDraw();
  tstate = defaultState(); saveState(); stopTimer();
  renderHome(); renderBracket(); renderMatch(true);
  toast("↺ Đã đặt lại kết quả thi đấu.");
}
function clearSavedData() {
  if (!confirm("Xóa TOÀN BỘ dữ liệu web đã lưu trong trình duyệt này, gồm tên 8 đội, kết quả bốc thăm, phiếu bầu, thẻ/ngành đã chọn và tiến trình thi đấu?")) return;
  try {
    localStorage.removeItem(LS_CONFIG);
    localStorage.removeItem(LS_STATE);
    localStorage.removeItem("cns_config_v1");
  } catch (e) {}
  cancelPairDraw();
  config = defaultConfig();
  tstate = defaultState();
  championMusicStartedFor = null;
  stopTimer();
  stopChampionMusic(true);
  renderHome();
  renderBracketTeams();
  renderBracket();
  renderMatch(true);
  showView("bracket");
  toast("🧹 Đã xóa toàn bộ dữ liệu đã lưu trong trình duyệt.");
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
$("#btnClearSavedData").addEventListener("click", clearSavedData);
$("#btnDrawR1").addEventListener("click", drawRound1);
$("#btnDrawR2").addEventListener("click", drawRound2);
var championAudio = championAudioEl();
if (championAudio) {
  ["loadedmetadata", "canplay", "play", "pause", "ended", "error"].forEach(function (eventName) {
    championAudio.addEventListener(eventName, function () { updateChampionMusicButton(); });
  });
}
var championMusicButton = $("#btnChampionMusic");
if (championMusicButton) championMusicButton.addEventListener("click", function () { toggleChampionMusic(); this.blur(); });
updateChampionMusicButton();


document.addEventListener("input", function (e) {
  var t = e.target;
  if (t.hasAttribute && t.hasAttribute("data-team-name")) {
    config.teams[+t.getAttribute("data-team-name")].name = t.value;
    saveConfig();
    renderBracket(); renderHome();
    if (currentView === "match") renderMatch(false);
  }
});
document.addEventListener("change", function (e) {
  var t = e.target;
  if (t.hasAttribute && t.hasAttribute("data-major-side")) {
    var def = currentDef(); if (!def) return;
    var ms = matchState(def.id);
    if (t.getAttribute("data-major-side") === "A") ms.majorA = t.value; else ms.majorB = t.value;
    saveState();
    renderBracket(); renderMatch(false);
    if (t.value) toast("🎓 Đã chọn ngành: " + t.value);
  }
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
renderBracketTeams();
renderBracket();
renderMatch(true);
