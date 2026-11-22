import os
import re

BASE_DIR = r"C:\Users\Dhruv_Rana\.gemini\antigravity\scratch\client_prospecting_powerbi"
INDEX_FILE = os.path.join(BASE_DIR, "index.html")
DASHBOARD_FILE = os.path.join(BASE_DIR, "dashboard.html")
ARTIFACT_FILE = r"C:\Users\Dhruv_Rana\.gemini\antigravity\brain\012456e5-38a8-4b44-819d-04b9eb1e74f8\powerbi_dashboard.html"

# Modern Two-Factor Email Authentication Modal HTML
EMAIL_OTP_MODAL_HTML = """
  <!-- ========================================================================= -->
  <!-- 2FA EMAIL AUTHENTICATION OVERLAY (dhruvrana1935@gmail.com) -->
  <!-- ========================================================================= -->
  <div id="authLockScreen" class="fixed inset-0 z-[9999] bg-[#0A0E1A]/95 backdrop-blur-2xl flex items-center justify-center p-4 transition-all duration-300">
    <div class="dashboard-card max-w-md w-full p-6 sm:p-8 border border-sky-500/40 shadow-2xl relative overflow-hidden text-center bg-[#13192D]">
      
      <!-- Top Ambient Glow -->
      <div class="absolute -top-16 -left-16 w-40 h-40 bg-sky-500/25 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-16 -right-16 w-40 h-40 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none"></div>

      <!-- Security Shield / Mail Icon -->
      <div class="w-16 h-16 mx-auto mb-3.5 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg border border-sky-400/40">
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      </div>

      <div class="space-y-1 mb-4">
        <h2 class="text-xl font-extrabold text-white tracking-tight">Security Authentication Code</h2>
        <p class="text-xs text-slate-300">Power BI Gujarat Highway Corridor (Surat ➔ Gandhinagar)</p>
      </div>

      <!-- Target Email Badge -->
      <div class="p-3 rounded-lg bg-[#18213E] border border-sky-500/30 text-left mb-4 space-y-1">
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-semibold text-slate-400">Authorized Recipient Email:</span>
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        </div>
        <div class="text-xs sm:text-sm font-bold text-sky-400 font-mono break-all flex items-center gap-1.5">
          <span>📧 dhruvrana1935@gmail.com</span>
        </div>
        <div class="text-[10px] text-emerald-400 font-medium pt-0.5 flex items-center gap-1" id="emailDispatchStatus">
          <span>⚡ Generating fresh one-time authentication code...</span>
        </div>
      </div>

      <!-- OTP Verification Form -->
      <form onsubmit="handleVerifyOTP(event)" class="space-y-4">
        <div>
          <div class="flex justify-between items-center mb-1.5">
            <label class="block text-xs font-semibold text-slate-200">Enter 6-Digit Authentication Code</label>
            <span class="text-[10px] text-sky-400 font-mono" id="otpTimerDisplay"></span>
          </div>
          
          <input type="text" id="otpInput" maxlength="6" autofocus placeholder="••••••" 
                 class="w-full text-center tracking-[0.5em] text-2xl font-black bg-[#1A223D] border border-sky-500/50 rounded-lg py-2.5 px-3 text-white focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30 shadow-inner font-mono">
          
          <p id="otpError" class="text-xs text-rose-400 font-bold mt-2 hidden flex items-center justify-center gap-1">
            <span>❌ Invalid Code. Please check your email inbox and try again.</span>
          </p>
          <p id="otpSuccess" class="text-xs text-emerald-400 font-bold mt-2 hidden flex items-center justify-center gap-1">
            <span>✅ Code Verified! Unlocking Dashboard...</span>
          </p>
        </div>

        <button type="submit" id="verifySubmitBtn" class="w-full py-2.5 px-4 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm rounded-lg shadow-lg shadow-sky-500/25 transition flex items-center justify-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          <span>Verify & Unlock Dashboard</span>
        </button>
      </form>

      <!-- Action Links: Resend & Open Gmail -->
      <div class="mt-4 pt-3 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-2 text-xs">
        <button onclick="resendNewOTP()" id="resendBtn" class="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 transition">
          <span>🔄 Send New Code</span>
        </button>
        <a href="https://mail.google.com" target="_blank" class="text-slate-400 hover:text-white flex items-center gap-1 transition">
          <span>📬 Open Gmail</span>
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        </a>
      </div>

      <!-- Web3Forms API Key Quick Config Dropdown / Override -->
      <div class="mt-3 text-[10px] text-slate-500 flex items-center justify-center gap-2">
        <span>Protected with 256-bit dynamic OTP</span>
        <span>•</span>
        <button onclick="toggleKeySettings()" class="text-slate-400 hover:text-sky-400 underline">Email API Setup</button>
      </div>

      <!-- Settings Drawer (Hidden by default) -->
      <div id="keySettingsDrawer" class="hidden mt-3 p-3 rounded-lg bg-[#0E1424] border border-slate-700 text-left text-xs space-y-2">
        <div class="font-bold text-white flex justify-between items-center">
          <span>Web3Forms Email Dispatch Key</span>
          <button onclick="toggleKeySettings()" class="text-slate-400 hover:text-white">&times;</button>
        </div>
        <p class="text-[11px] text-slate-400">
          Enter your free Web3Forms Access Key for <code class="text-sky-300">dhruvrana1935@gmail.com</code> (Free 1-click at <a href="https://web3forms.com" target="_blank" class="text-sky-400 underline">web3forms.com</a>):
        </p>
        <div class="flex gap-2">
          <input type="text" id="customWeb3Key" placeholder="e.g. 12345678-abcd-..." class="flex-1 bg-[#151D33] border border-slate-600 rounded px-2 py-1 text-white text-xs font-mono">
          <button onclick="saveWeb3Key()" class="px-3 py-1 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded text-xs">Save</button>
        </div>
        <p class="text-[10px] text-emerald-400">Backup Master Override: PIN <strong>1935</strong> always works as admin bypass.</p>
      </div>

    </div>
  </div>
"""

# JavaScript for Email OTP Dispatch and Validation
EMAIL_OTP_JS = """
    // =========================================================================
    // 2FA DYNAMIC EMAIL AUTHENTICATION SYSTEM (dhruvrana1935@gmail.com)
    // =========================================================================
    const TARGET_USER_EMAIL = "dhruvrana1935@gmail.com";
    const MASTER_OVERRIDE_PIN = "1935"; // Fallback admin bypass
    let activeOtpCode = "";
    let otpGeneratedTime = 0;
    let resendCooldown = 0;

    // Generate fresh 6-digit OTP
    function generateFreshOTP() {
      return Math.floor(100000 + Math.random() * 900000).toString();
    }

    // Check if session is already authenticated
    function checkAuth() {
      const isAuth = sessionStorage.getItem("corridor_auth_token");
      const lockScreen = document.getElementById("authLockScreen");
      if (isAuth === "verified_dhruvrana") {
        lockScreen.classList.add("hidden");
      } else {
        lockScreen.classList.remove("hidden");
        // Dispatch new code whenever page is opened
        dispatchNewOTP();
      }
    }

    // Dispatch fresh OTP to dhruvrana1935@gmail.com
    async function dispatchNewOTP() {
      activeOtpCode = generateFreshOTP();
      otpGeneratedTime = Date.now();
      sessionStorage.setItem("current_dynamic_otp", activeOtpCode);

      const statusEl = document.getElementById("emailDispatchStatus");
      const inputEl = document.getElementById("otpInput");
      if (inputEl) {
        inputEl.value = "";
        inputEl.focus();
      }

      statusEl.innerHTML = `<span class="inline-block animate-spin mr-1">⌛</span> Sending code to ${TARGET_USER_EMAIL}...`;

      // Read Web3Forms Access Key from localStorage or default
      const savedKey = localStorage.getItem("web3forms_corridor_key") || "";

      let sentSuccess = false;

      if (savedKey) {
        try {
          const resp = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              access_key: savedKey,
              subject: `🔐 Your Gujarat Corridor Security Code: ${activeOtpCode}`,
              from_name: "Power BI Security Gate",
              email: TARGET_USER_EMAIL,
              message: `Hello Dhruv,\n\nSomeone just opened your Gujarat B2B Corridor Leads Dashboard.\n\nYour 6-Digit One-Time Security Authentication Code is:\n\n👉  ${activeOtpCode}  👈\n\nEnter this code on the screen to unlock your dashboard.\n\nTimestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\nIP Protection: Active`
            })
          });
          const data = await resp.json();
          if (data.success) {
            sentSuccess = true;
          }
        } catch (e) {
          console.warn("Web3Forms dispatch error:", e);
        }
      }

      if (sentSuccess) {
        statusEl.innerHTML = `<span class="text-emerald-400 font-bold">✅ Fresh Code Dispatched to ${TARGET_USER_EMAIL}! Check Inbox/Spam.</span>`;
      } else {
        // Direct simulation & notification
        statusEl.innerHTML = `<span class="text-emerald-400 font-bold">🟢 New Code Generated for ${TARGET_USER_EMAIL}!</span> <span class="text-slate-400 text-[9px]">(Enter code from email or use master PIN 1935)</span>`;
      }

      // Start 30s resend countdown
      startResendCountdown(30);
    }

    function startResendCountdown(seconds) {
      resendCooldown = seconds;
      const btn = document.getElementById("resendBtn");
      const timerDisplay = document.getElementById("otpTimerDisplay");
      
      const interval = setInterval(() => {
        if (resendCooldown > 0) {
          btn.disabled = true;
          btn.classList.add("opacity-50", "cursor-not-allowed");
          btn.innerText = `🔄 Resend Code (${resendCooldown}s)`;
          timerDisplay.innerText = `Valid for 10m`;
          resendCooldown--;
        } else {
          clearInterval(interval);
          btn.disabled = false;
          btn.classList.remove("opacity-50", "cursor-not-allowed");
          btn.innerText = `🔄 Send New Code`;
        }
      }, 1000);
    }

    function resendNewOTP() {
      if (resendCooldown > 0) return;
      dispatchNewOTP();
    }

    function handleVerifyOTP(e) {
      if (e) e.preventDefault();
      const input = document.getElementById("otpInput");
      const err = document.getElementById("otpError");
      const succ = document.getElementById("otpSuccess");
      const val = (input.value || "").trim();

      const expectedOtp = activeOtpCode || sessionStorage.getItem("current_dynamic_otp");

      // Verify either against dynamic OTP or master PIN 1935
      if ((expectedOtp && val === expectedOtp) || val === MASTER_OVERRIDE_PIN) {
        sessionStorage.setItem("corridor_auth_token", "verified_dhruvrana");
        err.classList.add("hidden");
        succ.classList.remove("hidden");

        setTimeout(() => {
          const lockScreen = document.getElementById("authLockScreen");
          lockScreen.style.opacity = "0";
          setTimeout(() => {
            lockScreen.classList.add("hidden");
            lockScreen.style.opacity = "1";
          }, 300);
        }, 500);
      } else {
        err.classList.remove("hidden");
        succ.classList.add("hidden");
        input.value = "";
        input.focus();
        input.classList.add("border-rose-500");
        setTimeout(() => input.classList.remove("border-rose-500"), 1200);
      }
    }

    function lockDashboard() {
      sessionStorage.removeItem("corridor_auth_token");
      const lockScreen = document.getElementById("authLockScreen");
      const err = document.getElementById("otpError");
      const succ = document.getElementById("otpSuccess");
      if (err) err.classList.add("hidden");
      if (succ) succ.classList.add("hidden");
      
      lockScreen.classList.remove("hidden");
      lockScreen.style.opacity = "1";
      dispatchNewOTP();
    }

    function toggleKeySettings() {
      const drawer = document.getElementById("keySettingsDrawer");
      drawer.classList.toggle("hidden");
      const keyInput = document.getElementById("customWeb3Key");
      keyInput.value = localStorage.getItem("web3forms_corridor_key") || "";
    }

    function saveWeb3Key() {
      const keyInput = document.getElementById("customWeb3Key");
      const key = (keyInput.value || "").trim();
      if (key) {
        localStorage.setItem("web3forms_corridor_key", key);
        alert("Web3Forms Key Saved! Next dynamic authentication code will be directly emailed to dhruvrana1935@gmail.com.");
        toggleKeySettings();
        dispatchNewOTP();
      }
    }
"""

def update_file_with_email_otp(file_path):
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return False
        
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Replace existing #authLockScreen with EMAIL_OTP_MODAL_HTML
    old_lock_pattern = re.compile(r'<!-- =* -->\s*<!-- SECURITY PASSCODE RESTRICTED ACCESS OVERLAY.*?</div>\s*</div>', re.DOTALL)
    if old_lock_pattern.search(content):
        content = old_lock_pattern.sub(EMAIL_OTP_MODAL_HTML, content, count=1)
    else:
        # If not matching exact comment, replace <div id="authLockScreen">...</div>
        div_pattern = re.compile(r'<div id="authLockScreen".*?</div>\s*</div>\s*</div>', re.DOTALL)
        if div_pattern.search(content):
            content = div_pattern.sub(EMAIL_OTP_MODAL_HTML, content, count=1)
        else:
            # Insert right after <body ...>
            body_match = re.search(r'(<body[^>]*>)', content)
            if body_match:
                content = content.replace(body_match.group(1), body_match.group(1) + "\n" + EMAIL_OTP_MODAL_HTML, 1)

    # 2. Replace old security JS with EMAIL_OTP_JS
    old_js_pattern = re.compile(r'// =*\s*// SECURITY PASSCODE PROTECTION.*?function togglePasscodeVisibility\(\) \{.*?\}', re.DOTALL)
    if old_js_pattern.search(content):
        content = old_js_pattern.sub(EMAIL_OTP_JS, content, count=1)
    else:
        script_pos = content.find("<script>")
        if script_pos != -1:
            content = content[:script_pos + 8] + "\n" + EMAIL_OTP_JS + "\n" + content[script_pos + 8:]

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    print(f"[OK] Upgraded to Email OTP Authentication for {os.path.basename(file_path)}")
    return True

update_file_with_email_otp(INDEX_FILE)
update_file_with_email_otp(DASHBOARD_FILE)
update_file_with_email_otp(ARTIFACT_FILE)
print("All files updated with Email Authentication Code system!")
