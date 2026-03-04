<script setup lang="ts">
import { onMounted, ref } from 'vue'

const ENVIRONMENT = window.__RUNTIME_CONFIG__.environment || '?'
const VERSION = __APP_VERSION__ || '?'
const BUILD = __BUILD_NUMBER__ || '?'
const GITSHA = __GIT_SHA__ || '?'

console.log(import.meta.env.MODE)
console.log(import.meta.env.PROD)
console.log(import.meta.env.DEV)

// STATES

const isAppLoading = ref(true)
const isExcuseLoading = ref(false)
const isExcuseAvailable = ref(false)

// FUNCTIONS

function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}

// CALLBACKS

async function handleWhyClick() {
  isExcuseLoading.value = true
  setTimeout(() => {
    isExcuseLoading.value = false
    isExcuseAvailable.value = true
  }, 1000)
}

// LIFE CYCLE

onMounted(async () => {
  try {
    await delay(3000)
  } finally {
    isAppLoading.value = false
  }
})
</script>

<template>
  <!-- Emoji -->
  <div v-if="isAppLoading" class="emoji hourglass">⏳</div>
  <div v-else class="emoji">😎</div>

  <div v-if="isAppLoading" class="title">Checking if it's still green</div>
  <div v-else class="title">Production is chillin'</div>

  <div v-if="!isAppLoading">
    <button :disabled="isExcuseLoading" @click="handleWhyClick">WHY?</button>
    <div v-if="isExcuseLoading" class="loader-container">
      <div class="loader"></div>
    </div>
    <div v-else-if="isExcuseAvailable" class="why">
      "The CI passed on the first try. Nobody knows why."
    </div>
  </div>
  <div class="divider"></div>
  <div class="footer">
    <span title="Version">🏷️ v{{ VERSION }}</span> •
    <span title="Environment">🚀 {{ ENVIRONMENT }}</span> •
    <span title="Build Number">🛠️ #{{ BUILD }}</span> • <span title="Git SHA">🌿 {{ GITSHA }}</span>
  </div>
</template>

<style scoped>
.emoji {
  font-size: clamp(4rem, 10vw, 8rem);
}

.title {
  font-size: 2rem;
  font-weight: 500;
  color: #cbd5e1;
}

.why {
  margin: 2rem auto 0;
  font-size: 1.2rem;
  max-width: 45ch;

  color: #94a3b8;
}

.loader-container {
  margin: 2rem auto 0;
  display: flex;
  justify-content: center;
}

.divider {
  margin: 3rem auto 1.5rem;

  width: 100%;
  max-width: 65ch;

  height: 1px;
  background-color: #334155;

  opacity: 0.6;
}

button {
  margin-top: 1rem;
  padding: 0.75rem 2rem;
  border-radius: 8px;

  background-color: #1e293b;
  border: 1px solid #334155;

  color: #e2e8f0;
  font-size: 1.3rem;
  font-weight: 500;
  letter-spacing: 0.05em;

  cursor: pointer;
  transition: all 0.2s ease;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.hourglass {
  display: inline-block;
  animation: anim-hourglass 2.8s ease-in-out infinite;
}

@keyframes anim-hourglass {
  /* Initial upright position */
  0% {
    transform: translateY(0) rotate(0deg);
  }

  /* First bounce */
  8% {
    transform: translateY(6px) rotate(0deg);
  }

  /* Return from first bounce */
  16% {
    transform: translateY(0) rotate(0deg);
  }

  /* Second bounce */
  24% {
    transform: translateY(6px) rotate(0deg);
  }

  /* Return from second bounce */
  32% {
    transform: translateY(0) rotate(0deg);
  }

  /* Rotate to upside-down position */
  45% {
    transform: translateY(0) rotate(180deg);
  }

  /* First bounce while upside-down */
  53% {
    transform: translateY(6px) rotate(180deg);
  }

  /* Return from first inverted bounce */
  61% {
    transform: translateY(0) rotate(180deg);
  }

  /* Second bounce while upside-down */
  69% {
    transform: translateY(6px) rotate(180deg);
  }

  /* Return from second inverted bounce */
  77% {
    transform: translateY(0) rotate(180deg);
  }

  /* Rotate back to upright (360deg = 0deg visually, smooth loop) */
  90% {
    transform: translateY(0) rotate(360deg);
  }

  /* Final state before looping */
  100% {
    transform: translateY(0) rotate(360deg);
  }
}

.loader {
  width: 18px;
  height: 18px;

  border: 2px solid #334155; /* base ring */
  border-top: 2px solid #22c55e; /* highlight (green accent) */
  border-radius: 50%;

  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
