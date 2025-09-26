/* --- Global configuration --- */
const KEYPOINT_API_URL = "https://serverless.roboflow.com/atc-jqhue/2";
const API_KEY = "uzkuNWY0Fg8F6oMZzaX9";
const CACHE_NAME = "cattle-health-v1.2";

let isOnline = navigator.onLine;
let deferredPrompt = null;
let isVoiceActive = false;
let recognition = null;
let currentAnalysis = null;

/* -------- Service-worker registration -------- */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const reg = await navigator.serviceWorker.register("/sw.js");
      reg.addEventListener("updatefound", () => {
        const nw = reg.installing;
        nw.addEventListener("statechange", () => {
          if (nw.state === "installed" && navigator.serviceWorker.controller) {
            showUpdateAvailable();
          }
        });
      });
    } catch (e) { console.error("SW register failed", e); }
  });
}

/* -------- PWA install prompt -------- */
window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  deferredPrompt = e;
  setTimeout(() => {
    if (!window.matchMedia("(display-mode: standalone)").matches) {
      document.getElementById("installPrompt").classList.add("show");
    }
  }, 10000);
});

async function installPWA(){
  if(!deferredPrompt) return;
  deferredPrompt.prompt();
  const {outcome}=await deferredPrompt.userChoice;
  if(outcome==="accepted"){speak("Application installed successfully");}
  deferredPrompt=null;
  document.getElementById("installPrompt").classList.remove("show");
}
function dismissInstall(){document.getElementById("installPrompt").classList.remove("show");}

/* -------- Network-status handling -------- */
window.addEventListener("online", ()=>{isOnline=true;updateConnectionStatus();syncOfflineData();speak("Connection restored");});
window.addEventListener("offline",()=>{isOnline=false;updateConnectionStatus();speak("Working offline mode activated");});

function updateConnectionStatus(){
  const status=document.getElementById("connectionStatus");
  const banner=document.getElementById("offlineBanner");
  if(isOnline){status.classList.remove("offline");status.querySelector(".status-text").textContent="Online";banner.classList.remove("show");}
  else{status.classList.add("offline");status.querySelector(".status-text").textContent="Offline";banner.classList.add("show");}
}

/* -------- Voice-recognition & TTS helpers -------- */
/* … include full speech-recognition, TTS, command-handler, etc. … */

/* -------- File upload & AI analysis -------- */
/* … include handleImageUpload, analyzeHealth, getKeypoints, deriveHealthMetrics, displayResults, etc. … */

/* -------- Community & finance helpers -------- */
/* … include askQuestion, shareSuccess, addExpense, exportData, etc. … */

/* -------- Utility & bootstrapping -------- */
document.addEventListener("DOMContentLoaded",()=>{updateConnectionStatus();initializeVoiceRecognition();updateDashboardStats();
  setTimeout(()=>speak("Welcome to CattleHealth Pro. Your AI-powered cattle health companion."),2000);
});
