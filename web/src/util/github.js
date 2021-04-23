import GitHub from "github-api";

let gh = new GitHub();
export const LS_GITHUB_TOKEN = "github.token"
export function initGitHub() {
    const token = localStorage.getItem(LS_GITHUB_TOKEN)
    gh = new GitHub({token});
}

initGitHub()