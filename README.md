# SonarQube + GitHub Actions CI/CD Demo

A small Node.js project for demonstrating this flow:

`git push -> GitHub Actions -> tests -> SonarQube scan -> Quality Gate -> deploy`

## 1. Install and run locally

```bash
npm install
npm start
```

Open `http://localhost:3000`.

Run tests:

```bash
npm test
```

## 2. Configure SonarQube

Create/import a project in SonarQube or SonarQube Cloud and copy its Project Key.

Edit `sonar-project.properties`:

```properties
sonar.projectKey=YOUR_PROJECT_KEY
```

For SonarQube Cloud, also uncomment and set:

```properties
sonar.organization=YOUR_ORGANIZATION_KEY
```

## 3. Configure GitHub Secrets

Repository -> Settings -> Secrets and variables -> Actions.

Create:

- `SONAR_TOKEN` - your Sonar analysis token
- `SONAR_HOST_URL` - required for a reachable self-hosted SonarQube Server. For SonarQube Cloud, follow the current Sonar project setup instructions; you may remove `SONAR_HOST_URL` from the workflow if it is not required by your setup.

Important: a GitHub-hosted runner cannot normally reach SonarQube running only at `localhost:9000` on your computer. Use SonarQube Cloud, a publicly/network-accessible SonarQube Server, or a self-hosted GitHub runner.

## 4. Push to GitHub

```bash
git init
git add .
git commit -m "initial project"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Open the repository's **Actions** tab. The workflow will run automatically.

## 5. What the workflow does

1. Checks out the Git repository.
2. Installs Node.js.
3. Runs `npm ci`.
4. Runs the tests.
5. Runs SonarQube analysis.
6. Checks the Quality Gate.
7. Runs the demo deployment job only after the Sonar job succeeds.

## Reel experiment

First capture a successful run. Then change the code or Quality Gate conditions so the new code violates your configured gate, commit, and push again. Capture the failed Quality Gate and skipped deployment. Fix the issue and push once more to show the pipeline turning green.

Note: exact SonarQube rules and Quality Gate conditions depend on your SonarQube edition/project configuration, so do not rely on one particular JavaScript line to force a failure.
