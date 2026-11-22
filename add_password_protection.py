import os
import re

BASE_DIR = r"C:\Users\Dhruv_Rana\.gemini\antigravity\scratch\client_prospecting_powerbi"
INDEX_FILE = os.path.join(BASE_DIR, "index.html")
DASHBOARD_FILE = os.path.join(BASE_DIR, "dashboard.html")
ARTIFACT_FILE = r"C:\Users\Dhruv_Rana\.gemini\antigravity\brain\012456e5-38a8-4b44-819d-04b9eb1e74f8\powerbi_dashboard.html"

# The security lock screen overlay HTML
LOCK_SCREEN_HTML = """
  <!-- ========================================================================= -->
  <!-- SECURITY PASSCODE RESTRICTED ACCESS OVERLAY (PIN: 1935) -->
  <!-- ========================================================================= -->
  <div id="authLockScreen" class="fixed inset-0 z-[9999] bg-[#0A0E1A]/95 backdrop-blur-2xl flex items-center justify-center p-4 transition-all duration-300">
    <div class="dashboard-card max-w-sm w-full p-6 sm:p-7 border border-sky-500/40 shadow-2xl relative overflow-hidden text-center bg-[#13192D]">
      
      <!-- Top Decorative Glow -->
      <div class="absolute -top-16 -left-16 w-36 h-36 bg-sky-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-16 -right-16 w-36 h-36 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <!-- Shield / Padlock Icon -->
      <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg border border-sky-400/40">
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
        </svg>
      </div>

      <div class="space-y-1 mb-5">
        <h2 class="text-lg font-bold text-white tracking-tight">Security Protected Portal</h2>
        <p class="text-xs text-slate-400">Power BI Gujarat Highway Corridor (Surat ➔ Gandhinagar)</p>
        <div class="inline-block mt-1 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-sky-500/15 text-sky-400 border border-sky-500/30">
          Restricted Access • PIN Required
        </div>
      </div>

      <!-- PIN Input Form -->
      <form onsubmit="handleUnlock(event)" class="space-y-4">
        <div>
          <label class="block text-[11px] font-medium text-slate-300 mb-1.5 text-left">Enter 4-Digit Security Passcode</label>
          <div class="relative">
            <input type="password" id="passcodeInput" maxlength="8" autofocus placeholder="••••" 
                   class="w-full text-center tracking-[0.4em] text-xl font-bold bg-[#1A223D] border border-sky-500/40 rounded-lg py-2.5 px-3 text-white focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 shadow-inner">
            <button type="button" onclick="togglePasscodeVisibility()" class="absolute right-3 top-3 text-slate-400 hover:text-white text-xs">
              <span id="passToggleIcon">👁️</span>
            </button>
          </div>
          <p id="passcodeError" class="text-xs text-rose-400 font-semibold mt-2 hidden flex items-center justify-center gap-1">
            <span>❌ Incorrect Passcode. Please enter valid PIN.</span>
          </p>
        </div>

        <button type="submit" id="unlockSubmitBtn" class="w-full py-2.5 px-4 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm rounded-lg shadow-lg shadow-sky-500/25 transition flex items-center justify-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/></svg>
          <span>Unlock Dashboard</span>
        </button>
      </form>

      <div class="mt-4 pt-3 border-t border-[var(--border-subtle)] text-[10px] text-slate-500">
        Authorized Access Only • Surat-to-Gandhinagar B2B Matrix
      </div>
    </div>
  </div>
"""

# Header Lock Button to insert next to User Avatar
LOCK_HEADER_BTN = """
      <!-- LOCK PORTAL BUTTON -->
      <button onclick="lockDashboard()" title="Lock Dashboard" class="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25 transition shadow">
        <span>🔒</span>
        <span class="hidden sm:inline">Lock</span>
      </button>
"""

# Security JS functions
SECURITY_JS = """
    // =========================================================================
    // SECURITY PASSCODE PROTECTION (PIN: 1935)
    // =========================================================================
    const SECRET_PIN = "1935";

    function checkAuth() {
      const isAuth = sessionStorage.getItem("corridor_auth_token");
      const lockScreen = document.getElementById("authLockScreen");
      if (isAuth === "verified_1935") {
        lockScreen.classList.add("hidden");
      } else {
        lockScreen.classList.remove("hidden");
        setTimeout(() => {
          const input = document.getElementById("passcodeInput");
          if (input) input.focus();
        }, 150);
      }
    }

    function handleUnlock(e) {
      if (e) e.preventDefault();
      const input = document.getElementById("passcodeInput");
      const err = document.getElementById("passcodeError");
      const val = (input.value || "").trim();

      if (val === SECRET_PIN) {
        sessionStorage.setItem("corridor_auth_token", "verified_1935");
        if (err) err.classList.add("hidden");
        const lockScreen = document.getElementById("authLockScreen");
        lockScreen.style.opacity = "0";
        setTimeout(() => {
          lockScreen.classList.add("hidden");
          lockScreen.style.opacity = "1";
        }, 250);
      } else {
        if (err) err.classList.remove("hidden");
        input.value = "";
        input.focus();
        input.classList.add("border-rose-500");
        setTimeout(() => input.classList.remove("border-rose-500"), 1200);
      }
    }

    function lockDashboard() {
      sessionStorage.removeItem("corridor_auth_token");
      const lockScreen = document.getElementById("authLockScreen");
      const input = document.getElementById("passcodeInput");
      const err = document.getElementById("passcodeError");
      if (err) err.classList.add("hidden");
      if (input) input.value = "";
      lockScreen.classList.remove("hidden");
      lockScreen.style.opacity = "1";
      setTimeout(() => {
        if (input) input.focus();
      }, 150);
    }

    function togglePasscodeVisibility() {
      const input = document.getElementById("passcodeInput");
      const icon = document.getElementById("passToggleIcon");
      if (input.type === "password") {
        input.type = "text";
        icon.innerText = "🙈";
      } else {
        input.type = "password";
        icon.innerText = "👁️";
      }
    }
"""

def inject_security_into_file(file_path):
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return False
        
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Check if already injected
    if 'id="authLockScreen"' in content:
        print(f"Already injected in {os.path.basename(file_path)}")
        return True

    # 1. Inject Lock Screen right after <body ...>
    body_match = re.search(r'(<body[^>]*>)', content)
    if not body_match:
        print(f"Cannot find <body> in {file_path}")
        return False
    body_tag = body_match.group(1)
    content = content.replace(body_tag, body_tag + "\n" + LOCK_SCREEN_HTML, 1)

    # 2. Inject Lock Header Button before User Avatar
    avatar_pattern = '<div class="w-7 h-7 rounded-full bg-sky-500/20 text-sky-400'
    if avatar_pattern in content:
        content = content.replace(avatar_pattern, LOCK_HEADER_BTN + "\n      " + avatar_pattern, 1)

    # 3. Inject Security JS inside <script>
    script_pos = content.find("<script>")
    if script_pos != -1:
        content = content[:script_pos + 8] + "\n" + SECURITY_JS + "\n" + content[script_pos + 8:]

    # 4. Ensure checkAuth() is called in DOMContentLoaded
    if "renderTable();" in content and "checkAuth();" not in content:
        content = content.replace("renderTable();", "checkAuth();\n      renderTable();")

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    print(f"[OK] Injected Password Security (PIN: 1935) into {os.path.basename(file_path)}")
    return True

inject_security_into_file(INDEX_FILE)
inject_security_into_file(DASHBOARD_FILE)
inject_security_into_file(ARTIFACT_FILE)
print("Security injection complete!")
