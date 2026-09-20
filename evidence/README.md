# Evidence Directory — Tronify.rent Wallet Drainer

Raw artifacts collected via direct HTTP requests (curl) and public blockchain APIs
(TronGrid, TronScan) on **2026-09-20** during live verification of the analysis
in the parent directory. Kept as-is (unmodified) for chain-of-custody / re-verification.

## Contents

- `payload/greenbid.js` — the live drainer payload as served by the C&C at
  `https://lending.fhogu.pw/greenbid.js?v=1` at fetch time.
  - SHA-256: `0f6d64472d6369a098f403db117b1285e79b0fdac79caaa639fc0e50e5bf4416`
  - Size: 150,274 bytes / 140 physical lines (confirmed by direct measurement, not estimated)
  - `payload/greenbid.js.response-headers.txt` — HTTP response headers (Cloudflare-fronted,
    `Last-Modified: Sun, 30 Aug 2026 02:50:52 GMT`, `ETag: "6a939a8c-24b02"` — the ETag's
    hex suffix `24b02` = 150,274 decimal, self-consistent with content-length).

- `site/tronify.rent_index.html` — the live homepage HTML at fetch time.
  - `site/tronify.rent_index.response-headers.txt` — headers show the site is fronted by
    **DDoS-Guard** (`server: ddos-guard`), not Cloudflare — a different provider than the
    payload host, and one commonly associated with abuse-tolerant/bulletproof hosting.
    `Last-Modified: Mon, 14 Sep 2026 21:56:46 GMT` (6 days before this fetch).

- `cnc/tron_config.json` — live response from the C&C's `/tron/config` endpoint, i.e. the
  **real attacker configuration** fetched directly (not the placeholder addresses in the
  original report drafts):
  ```json
  {"tronSpender":"TV6n8cCLmX5mRCMMNvcE1K1i87Yo9Ys5rv","tronSweepAddress":"TLv3iSnZxWghEmadLDzuAK2p5GkAwg7tpJ","tronSweepMinTrx":100,"tronExchangeContract":"TDE7vfjJuYqEzzKw6hfdSB3dfLQyXDYPux"}
  ```
  Note: attackers can rotate this at any time — this is a snapshot as of the fetch timestamp
  in `cnc/tron_config.response-headers.txt` (`Date: Sun, 20 Sep 2026 04:30:40 GMT`), not a
  permanent IoC.

- `onchain/account_tronSpender_*.json`, `onchain/account_tronSweepAddress_*.json`,
  `onchain/account_tronExchangeContract_*.json` — TronGrid `/v1/accounts/{address}` snapshots
  for the three addresses above, taken immediately after the C&C fetch. Confirms current
  balances, account creation time, and last-activity time (see main IoC report for analysis).

- `onchain/trc20_transfers_tronSweepAddress_page1.json` — most recent 30 TRC-20 (USDT)
  transfers into/out of the sweep address, via TronGrid
  `/v1/accounts/{address}/transactions/trc20`. This is the primary evidence for real,
  ongoing victim activity (distinct sender addresses) and attacker consolidation transfers.
  This is only the first page (most recent transfers) — full historical volume would
  require paginating with the `fingerprint` cursor in the response `links.next`.

## SHA256SUMS.txt

Checksums for every file above, generated at collection time — use to detect if any
copy of these files is later modified.

## Collection method

All fetches were plain HTTP GET requests via `curl` with a standard browser User-Agent,
and public, unauthenticated blockchain API calls (TronGrid). No wallet was connected, no
transaction was signed or broadcast, and no interaction with `tronify.rent`'s "Connect
Wallet" flow occurred. This is passive OSINT collection only.
