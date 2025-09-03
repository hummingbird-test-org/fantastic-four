# fantastic-four

- Frontend Project for sbom generation

## Discovery

### Strategy 1

- Listen to Release events, and upon `release.created` do a rest call to generate the SBOM
- To subscribe to this event, a GitHub App must have at least read-level access for the "Contents" repository permission.

### Questions

1. There are 3 `release` events with below actions, which one should be the trigger for SBOM generation ?
    - `created`
    - `released`
    - `published`
2. Repository must have "Dependency Graph" enabled, else it won't let SBOM be generated <https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/configuring-the-dependency-graph#enabling-and-disabling-the-dependency-graph>



#### Reference

- <https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation#using-octokitjs-to-authenticate-with-an-installation-id>
- <https://docs.github.com/en/webhooks/webhook-events-and-payloads#release>
- <https://docs.github.com/en/rest/dependency-graph/sboms?apiVersion=2022-11-28&search-overlay-input=release>
-<https://octokit.github.io/rest.js/v22/#dependency-graph-export-sbom>
