# DevOps Fieldnotes — Jairaj Rao

Live site: https://jairaj97.github.io/

A practical DevOps field guide. The homepage leads with an interactive [release troubleshooting guide](https://jairaj97.github.io/release-triage.html) covering Docker build, Azure Container Registry image pull, Kubernetes rollout, and Service traffic. The verified AKS lab remains as a supporting case study and source-linked example.

The guide is static HTML, CSS, and JavaScript. It runs in the browser without accounts, backend services, analytics, or pasted logs. Commands use placeholders; readers must check their cluster context and substitute their own names. The sources at the bottom of the guide link to Docker, Microsoft, and Kubernetes documentation.

## Edit and publish

Edit `index.html` for the homepage and `release-triage.html`, `release-triage.css`, or `release-triage.js` for the guide. `fieldnotes.css` contains shared styles. Push to `main`; GitHub Pages serves the repository root with `.nojekyll` and no build step.

The AKS case study records the successful 29 September 2026 release and zero-change Terraform plan. Implementation links are pinned to the verified project revision; early Docker notes link to a historical revision. Re-check source and live behavior before changing those claims.

## Scope

This guide diagnoses a release; it does not change a deployment. The ACR connectivity command can create a temporary diagnostic workload. The examples are starting points for investigation, not a substitute for the runbooks and approval process of a production environment. Company interview questions and private work details do not belong in this public repository.
