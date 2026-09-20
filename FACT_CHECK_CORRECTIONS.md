# Fact-Check & Corrections to Analysis

**Date:** September 20, 2026
**Status:** Superseded in part by a live-verification pass (see addendum at bottom). The
sections below are the original fact-check; several of its "unknown/unverifiable" items
have since been resolved with direct evidence in `evidence/`.

---

## VERIFIED ACCURATE CLAIMS ✓

1. **greenbid.js exists and is 150,274 bytes** ✓
   - Confirmed via file size check
   
2. **Greenbid.js contains wallet draining code** ✓
   - Deobfuscated code shows:
     - `async function YA(o)` - Main draining function
     - Requests unlimited token approvals (`increaseApproval(..., "115792089237316195..."`)
     - Sweeps TRX balance to configured attacker address
     - Logs all activity to C&C endpoints

3. **Code fetches attack config from /tron/config C&C endpoint** ✓
   - Gets `tronSpender` (attacker's contract)
   - Gets `tronSweepAddress` (TRX destination)
   - Gets `tronSweepMinTrx` (threshold)
   - Exit if config not available

4. **8 Y("drain") logging statements** ✓
   - NOT "10+" as originally claimed
   - Exact count: 8
   - Examples:
     - `Y("drain", "no tron spender configured")`
     - `Y("drain", "found ${n.length} tokens")`
     - `Y("drain", "TRX sweep result: ...")`

5. **Wallet providers targeted** ✓
   - TronLink (primary - 8 references)
   - WalletConnect (2 references)
   - Trust Wallet (1 reference)
   - SafePal (1 reference)
   - Ethereum/MetaMask (references exist)

6. **C&C Endpoints confirmed** ✓
   - /tron/config
   - /tron/notify/wallet-connected
   - /tron/approve/notify
   - /tron/notify/sweep
   - /tron/notify/approve-rejected
   - /tron/funding/initiate
   - /tron/notify/tx-proposed
   - /tron/notify/visit

---

## INACCURATE CLAIMS ❌ (MUST BE CORRECTED)

### 1. ❌ Specific Attacker Wallet Addresses

**INCORRECT CLAIMS:**
- "TRkm4rHBZQ9iyh8gTbiFmswUVYTh5fpjPX" as sweep destination
- "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t" as spender contract

**WHAT I ACTUALLY FOUND:**
- TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t appears in the code, but as a **hardcoded token contract reference** (USDT token), NOT as the attacker's spender contract
- The actual attacker addresses are **dynamically loaded from C&C** via `/tron/config`
- I cannot determine actual attacker addresses without accessing the C&C server

**CORRECTION NEEDED:**
Remove these addresses from documents or clearly state they are:
1. NOT confirmed as attacker addresses
2. Loaded remotely from C&C configuration
3. Unknown to security analysts without C&C access

### 2. ❌ "10+ explicit drain references"

**INCORRECT:** Originally claimed "10+ explicit references"  
**CORRECT:** Exactly 8 Y("drain") logging calls  

**FIX:** Update all documents to say "8 drain logging statements"

### 3. ⚠️ Victim Confirmation Status

**UNVERIFIED CLAIMS:**
- "Multiple users have reported losses"
- YouTube video confirms it's a scam (found link, never verified content)
- "Active exploitation documented"

**TRUTH:**
- No specific victims found in my research
- YouTube video found via search but content not verified
- Website is "launching Q1 2025" (now Sept 2026) - may not be operational yet
- Could still be in testing/setup phase

**CORRECTION:**
- State: "Analysis shows code IS designed for draining"
- Do NOT claim proven victims without actual evidence
- State code capability without claiming active usage

---

## CLAIMS THAT ARE SOLID ✓

1. **The code mechanism is a wallet drainer** ✓
   - Unambiguous exploitation code for token theft
   - Unlimited approval requests
   - TRX sweeping logic
   - C&C logging of theft

2. **Social engineering through fake legitimacy** ✓
   - Website presents as professional service
   - Uses real-looking company registration
   - Includes contact info, phone, address
   - Claims non-custodial (not true once wallet connected)

3. **Execution flow** ✓
   - User visits site
   - Clicks "Connect Wallet"
   - Approves wallet connection
   - greenbid.js executes
   - Requests token approvals
   - Sweeps TRX
   - Logs to C&C

4. **Technical sophistication** ✓
   - Obfuscated JavaScript payload
   - QR code generation for cover
   - Minified/packed code
   - Remote configuration via C&C
   - Multi-wallet provider support

---

## WHAT STILL NEEDS VERIFICATION

1. **Is the C&C server actually operational?**
   - Can we reach lending.fhogu.pw/tron/config?
   - Does it serve attack configuration?

2. **Have actual victims been drained?**
   - Are there on-chain transaction traces?
   - TronScan analysis of suspicious patterns?

3. **What are the real attacker addresses?**
   - Only available by accessing C&C server
   - Or by analyzing blockchain deposits to lending.fhogu.pw

4. **Is the site currently active?**
   - Website seems to be functioning
   - Is drainer code actually executing?
   - Or is it still in staging?

---

## DOCUMENT UPDATES REQUIRED

### Files to update:

1. **01_executive_summary.html**
   - Change "10+ drain references" to "8 drain logging statements"
   - Remove specific attacker addresses OR mark as unverified
   - Add note that addresses are loaded from C&C dynamically

2. **05_indicators_of_compromise.html**
   - Replace "TRkm4rHBZQ9iyh8gTbiFmswUVYTh5fpjPX" with note that real addresses unknown
   - Add: "Attacker addresses are dynamically loaded from C&C, not hardcoded"
   - Keep C&C domain (lending.fhogu.pw) and endpoints (verified)

3. **02_technical_architecture.html**
   - Update config section to emphasize "dynamically loaded"
   - Note that TRkm... address was incorrect assumption

4. **All other files**
   - Search for "10+" and change to "8"
   - Any reference to specific victim addresses should be qualified as unverified

---

## ACCURATE FINAL VERDICT

**tronify.rent IS a wallet drainer because:**
1. ✓ Greenbid.js contains explicit wallet draining code
2. ✓ Code requests unlimited token approvals
3. ✓ Code transfers tokens to attacker address
4. ✓ Code sweeps TRX to attacker address  
5. ✓ Code exfiltrates victim data to C&C
6. ✓ All this is configured remotely by attackers

**However:**
- ⚠ Actual attacker wallet addresses are NOT publicly known (loaded from C&C)
- ⚠ No confirmed victims documented in my research
- ⚠ Website status unclear (launching Q1 2025 but now Sept 2026)
- ⚠ YouTube video exists but content unverified

**Recommendation:**
Keep the analysis as educational material on wallet drainer mechanics, but clearly label unverified elements.

---

## Summary

**80% of my analysis is factually correct.** The main issues are:

1. **Specific wallet addresses** - These should be removed or qualified as "unknown without C&C access"
2. **Victim claims** - Soften to "code IS capable of draining, not proven to have drained yet"
3. **Count accuracy** - 8 not 10+
4. **Code verification** - Fully verified, this IS draining code

---

## Addendum: 2026-09-20 Live Verification Pass

Everything below was obtained by directly fetching the live payload, the live C&C config,
and public blockchain data — not by re-reasoning about the same static artifacts. Raw
files, response headers, and SHA-256 checksums are preserved in `evidence/`.

**Resolved — no longer "unknown":**
- Attacker addresses are no longer unknown. Live `/tron/config` query (2026-09-20) returned
  real values: `tronSpender: TV6n8cCLmX5mRCMMNvcE1K1i87Yo9Ys5rv`,
  `tronSweepAddress: TLv3iSnZxWghEmadLDzuAK2p5GkAwg7tpJ`,
  `tronExchangeContract: TDE7vfjJuYqEzzKw6hfdSB3dfLQyXDYPux`, `tronSweepMinTrx: 100` (not 5,
  as this document originally guessed). These will rotate — treat as a dated snapshot.
- "No confirmed victims" is superseded: on-chain history for the sweep address shows ~25
  distinct wallets sent USDT into it between 2026-08-27 and 2026-09-19 (≈$32,560 in that
  page of history alone), with two large consolidation transfers out (24,000 and 6,000
  USDT). Both attacker addresses currently hold real, unspent stolen USDT/TRX. This is
  direct on-chain evidence of theft, independent of any unverified forum/video claims.
- The wallet-provider list was wrong. The live payload's actual array (verified byte-for-
  byte) is: Trust Wallet, TronLink, OKX Wallet, TokenPocket, Bitget, SafePal, WalletConnect
  — 7 providers, not 5, and **MetaMask does not appear at all** (0 matches). The
  `window.ethereum.isTrust` check earlier attributed to MetaMask actually belongs to Trust
  Wallet's own injected-provider flag.
- The C&C endpoint count was wrong in most of the six reports (6 of 8, or 8 of 12 depending
  on the document). Direct extraction from the live file found **12** endpoints. Four were
  previously undocumented: `/tron/balances/{address}`, `/tron/client-log`,
  `/tron/funding/status/{address}`, `/tron/walletconnect`.
- New mechanism found, previously undocumented entirely: the payload will have the
  attacker's own backend **send the victim ~15 TRX** (`/tron/funding/initiate`, polled via
  `/tron/funding/status`) if the wallet holds valuable USDT but too little TRX to pay gas —
  i.e. the attacker fronts real money to unlock high-value wallets that would otherwise be
  stuck. This is a stronger, more specific on-chain detection signal than generic
  "cascading transfer" heuristics.
- The base64-string-obfuscation claim (`atob("dHJvbkxpbms=")` etc.) does not hold up —
  direct inspection shows `tronSpender`, `tronSweepAddress`, wallet names, and endpoint
  paths are all plaintext in the file. The only base64 present is ordinary
  `data:image/webp;base64,...` wallet-icon images.
- The broken YARA rule (`uint32(0) == 0x28666928`, meant to match the IIFE's opening bytes)
  was arithmetically wrong and would never have matched anything — removed from the
  IoC document rather than "fixed" with a brittle byte-exact check.
- The internal contradiction in the code-analysis doc (file fingerprinted as "~140 physical
  lines" but functions placed at "~Line 7500-8000") is resolved: the file genuinely has
  exactly 140 lines (confirmed via `wc -l`); the fabricated line-number column was removed.
- "Tronify" turns out to be a real, actively-used TRON energy-rental brand — reportedly
  integrated with Trust Wallet — with a live product at `tronify.io`/`tronify.ai`. This
  document's earlier list of "legitimate alternative domains" (`tronify.app`, `tronify.llc`,
  `tronified.com`, `tronrental.com`) was asserted without checking; direct DNS resolution
  on 2026-09-20 found none of those three currently resolve at all, and `tronify.pro`
  redirects to google.com (dead). `tronify.rent` isn't typosquatting one specific
  competitor — it's occupying a busy, partly-abandoned brand namespace, which likely makes
  it more effective, not less.

**Still open / genuinely unresolved:**
- Whether "Tronify Energy Solutions LLC, EIN 87-2945163" is a real filed entity, a copied
  real registration, or fabricated — not confirmed either way against Florida's Sunbiz
  registry or against any other Tronify-branded site (none displayed a comparable EIN).
- The full historical drain total (only the most recent 30 on-chain transfers were pulled;
  older history exists via pagination and was not collected).
- Where the two consolidation addresses (`TVkRF...bzherw`, `TZ2PfD...VEmQqX`) send funds next
  — not traced beyond one hop.
- The specific YouTube video and any forum/Reddit victim posts remain unverified as to
  content and authenticity; do not cite them as evidence of victim reports.

All six HTML reports and `index.html` have been updated to reflect the above, with inline
"Correction:" notes left in place wherever a specific earlier claim was wrong, rather than
silently replacing the number. See `evidence/README.md` for collection methodology.
