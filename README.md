# fantastic-four

Frontend Project for sbom generation discovery 

## Discovery

### Strategy 1

- Listen to Release events, and upon `release.created` do a GH API call ( `dependencyGraph.exportSbom` ) to generate the SBOM
- To subscribe to this event, a GitHub App must have at least read-level access for the "Contents" repository permission.
- Repository must have _"Dependency Graph"_ enabled

### Observations

1. There are 3 `release` events with below actions, which one should be the trigger for SBOM generation ?
    - `created`
    - `released`
    - `published`
2. Repository must have "Dependency Graph" enabled, else it won't let SBOM be generated <https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/configuring-the-dependency-graph#enabling-and-disabling-the-dependency-graph>
And there's no REST/GQL endpoint for doing it programmatically.

3. The current GitHub REST API for SBOM export (dependencyGraph.exportSbom) does not support a ref parameter. The API only generates the SBOM for the repository’s default branch ( `main` ), If we need an SBOM for another branch, 
    - we would need to check out that branch locally and generate the SBOM using a local tool, 
    - Or change the repository’s default branch.

4. SBOM can't be generated on tag specific code, its always taking the latest code in the branch.

5. SBOM generation comes under `dependency graph` feature of github, which is free on public repository but for private repos there's a need of plan.

### SBOM Meta Data

Only specifies the repo details not the ref or branch details.

```json
    {
        "spdxVersion": "SPDX-2.3",
        "dataLicense": "CC0-1.0",
        "SPDXID": "SPDXRef-DOCUMENT",
        "name": "com.github.hummingbird-test-org/fantastic-four",
        "documentNamespace": "https://spdx.org/spdxdocs/protobom/2cdc940e-f896-4983-a3ec-90379756fbfe",
        "creationInfo": {
        "creators": [
            "Tool: protobom-v0.0.0-20250902230112-3b6330baf42b+dirty",
            "Tool: GitHub.com-Dependency-Graph"
        ],
        "created": "2025-09-03T12:21:30Z",
        "packages": [],
        "relationships": []
    }
```

#### Reference

- <https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation#using-octokitjs-to-authenticate-with-an-installation-id>
- <https://docs.github.com/en/webhooks/webhook-events-and-payloads#release>
- <https://docs.github.com/en/rest/dependency-graph/sboms?apiVersion=2022-11-28&search-overlay-input=release>
-<https://octokit.github.io/rest.js/v22/#dependency-graph-export-sbom>
- <https://docs.github.com/en/code-security/trialing-github-advanced-security/planning-a-trial-of-ghas>
- <https://docs-cortex.paloaltonetworks.com/r/Cortex-XSIAM/Cortex-XSIAM-Enterprise-Documentation/Onboard-version-control-systems>


## Strategy 2

Create an workflow on the repo and drive SBOM through that.