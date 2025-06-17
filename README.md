
# 🧠 CLANCHAIN – TECHNICAL ARCHITECTURE BREAKDOWN

---

## ⚙️ **BACKEND ARCHITECTURE**

| Layer                          | Technology                      | Role                                                                           |
| ------------------------------ | ------------------------------- | ------------------------------------------------------------------------------ |
| 🧬 **Database**                | MongoDB Atlas                   | Flexible document DB to store lineage trees, ethics rules, vaults, disputes    |
| 🧠 **Multi-Agent Logic**       | Python + Google ADK             | Houses agents like `CovenantAgent`, `VaultAgent`, `DisputeAgent`, `FaithAgent` |
| 🔗 **APIs**                    | FastAPI or Flask                | RESTful endpoints to expose data & AI agent outputs                            |
| 🔐 **Authentication**          | Firebase Auth                   | Secure role-based identity: elder, diaspora, member, admin                     |
| ⏳ **Scheduler**                | Celery / Google Cloud Scheduler | Automates rites, rituals, periodic checks, reminders                           |
| 📥 **Voice/Emotion Inference** | Optional: Gemini + Webhooks     | For interpreting pet audio, elder voice notes, or ritual tones                 |
| 🔐 **Access Control**          | Firestore Rules or JWT claims   | Limits access based on role, location, ethics config                           |
| 📜 **Rule Engine**             | JSON-based moral logic configs  | Editable ethical trees for inheritance, decision filters                       |

---

### 🔁 Backend Modules : 

| Module                  | Key Functions                                               |
| ----------------------- | ----------------------------------------------------------- |
| `auth_controller.py`    | Login, role validation, elder override detection            |
| `clan_controller.py`    | Create/update clans, fetch clan metadata                    |
| `member_controller.py`  | Add/remove/edit clan members, track lineage                 |
| `vault_controller.py`   | Deposit, withdraw, simulate fund flows                      |
| `dispute_controller.py` | Log disputes, assign agents, log AI recommendations         |
| `ethics_engine.py`      | Read ethics JSON, compute paths, validate overrides         |
| `rites_controller.py`   | Log ceremonies, attach voice/audio/ritual metadata          |
| `agent_hub.py`          | Orchestrate active AI agents with payloads                  |
| `event_logger.py`       | Save all actions in immutable `agent_logs` for transparency |

---

## 🧑‍💻 **FRONTEND ARCHITECTURE**

| Layer                       | Technology                              | Role                                                       |
| --------------------------- | --------------------------------------- | ---------------------------------------------------------- |
| 🧱 **Framework**            | Vite + React + TypeScript               | Fast, modular, reactive UI for web + mobile                |
| 🎨 **UI Styling**           | TailwindCSS + shadcn/ui                 | Culturally-aware themes, light/dark mode, spiritual motifs |
| 🌀 **State Mgmt**           | React Context / Zustand                 | For roles, data refreshes, agent response display          |
| ⚡ **Realtime Sync**         | Firestore SDK (optional)                | For vault logs, agent verdicts, real-time dispute updates  |
| 🖼️ **Animation/UI Motion** | Framer Motion + Rive                    | Avatar emotions, page transitions, ritual feedback         |
| 🐾 **Voice/Audio UX**       | TTS APIs or ElevenLabs                  | For avatars, blessings, or bedtime pet voices              |
| 🌐 **Multilingual**         | i18n + locale hooks                     | English, Kiswahili, Arabic, French, etc.                   |
| 🔍 **Data Queries**         | Axios/Fetch to FastAPI + Firebase hooks | Connects API to UI components via JSON                     |

---

### 📂 Key Frontend Components

| Component                | Purpose                                                      |
| ------------------------ | ------------------------------------------------------------ |
| `<ClanDashboard />`      | Overview of elders, members, active disputes, vaults         |
| `<VaultPanel />`         | View current savings, request funds, simulate impact         |
| `<DisputeBoard />`       | Log/view inheritance issues, agent decisions                 |
| `<RiteTimeline />`       | See all past/future rites: births, marriages, funerals       |
| `<AgentVerdict />`       | View 3-option resolution paths from AI with scripture quotes |
| `<EthicsConfigEditor />` | Visual JSON editor for clan moral rules                      |
| `<AvatarCompanion />`    | Rive-rendered pet/wildlife avatar that speaks/acts           |
| `<DiasporaPortal />`     | Diaspora can vote, send money, or log in remotely            |
| `<MemoryWall />`         | Archive of elders, teachings, story/audio logs               |
| `<SettingsPanel />`      | Role, language, data visibility, spiritual settings          |

---

## 🔄 BACKEND–FRONTEND DATA FLOW

1. 🔑 **Login → Role Claim**

   * Firebase Auth → Role injected as JWT
   * Frontend routes/pages filtered based on role

2. 📡 **Clan Overview Fetch**

   * React component pulls `/clan/:id` → shows dashboard
   * MongoDB returns nested JSON for members, elders, rituals

3. 🧠 **Dispute Created**

   * User fills form → `POST /dispute`
   * Server logs, assigns agent → triggers `DisputeAgent` via ADK

4. 🤖 **AI Returns Verdicts**

   * `DisputeAgent` calls `CovenantAgent`
   * 3 verdicts + scriptures sent to frontend → shown as choices

5. 💸 **Vault Change**

   * Button: "Request Withdrawal for Funeral"
   * Agent simulates impact, ethics pass → Funds approved/rejected

6. 🛐 **Rite Logged + Played**

   * Ritual: “Naming ceremony”
   * Avatar appears with audio, light cue, and calendar log

---

## 🔐 ACCESS LOGIC

| Role       | Access                                         |
| ---------- | ---------------------------------------------- |
| `Elder`    | Edit ethics, approve overrides, record rituals |
| `Member`   | View tree, disputes, request funds             |
| `Diaspora` | Read-only; send donations, vote on proposals   |
| `AI Agent` | No direct access; triggered via events         |
| `Admin`    | System config, clan merging, ethics reset      |

---

## 🔄 API Sample (JSON)

### 🎯 POST `/api/dispute`

```json
{
  "clan_id": "kisii_nyangena",
  "submitted_by": "uid_002",
  "type": "inheritance",
  "description": "Firstborn daughter seeks land rights",
  "evidence": ["voice_note_002.mp3"],
  "status": "open"
}
```

### 💡 Response (Agent Verdict)

```json
{
  "agent": "CovenantAgent",
  "verdicts": [
    {
      "path": "equal_land_distribution",
      "scripture": "Deut 21:17",
      "score": 0.2
    },
    {
      "path": "male_line_only",
      "custom": "Gusii elder rule",
      "score": 0.7
    }
  ]
}
```

---


