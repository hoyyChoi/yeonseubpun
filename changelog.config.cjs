// changelog.config.cjs
module.exports = {
  // 기본 규칙
  preset: "conventionalcommits",
  tagPrefix: "v",

  // 섹션 매핑(보이고/숨길 타입)
  types: [
    { type: "feat", section: "Features" },
    { type: "fix", section: "Bug Fixes" },
    { type: "perf", section: "Performance" },
    { type: "revert", section: "Reverts" },
    { type: "docs", section: "Documentation", hidden: true },
    { type: "style", section: "Styles", hidden: true },
    { type: "refactor", section: "Refactoring", hidden: true },
    { type: "test", section: "Tests", hidden: true },
    { type: "build", section: "Build System", hidden: true },
    { type: "ci", section: "CI", hidden: true },
    { type: "chore", section: "Chores", hidden: true },
  ],

  // 링크 템플릿 (GitHub 기준)
  commitUrlFormat: "{{host}}/{{owner}}/{{repository}}/commit/{{hash}}",
  compareUrlFormat:
    "{{host}}/{{owner}}/{{repository}}/compare/{{previousTag}}...{{currentTag}}",
  issueUrlFormat: "{{host}}/{{owner}}/{{repository}}/issues/{{id}}",

  writerOpts: {
    // 헤더: "## v1.2.3 (2025-08-13)"
    headerPartial:
      "{{#if currentTag}}## {{currentTag}} ({{formattedDate}})\n{{/if}}",

    // 커밋 라인: "* scope: subject (abc123)"
    commitPartial:
      "* {{#if scope}}**{{scope}}:** {{/if}}{{subject}} ({{shortHash}})\n",

    // 커밋 전처리: 새 객체 만들어 반환(불변성 준수)
    transform: (commit) => {
      if (!commit || !commit.subject) return commit;

      const shortHash = commit.hash ? commit.hash.substring(0, 7) : "";

      // notes 배열 복사 + title 변경
      const notes = Array.isArray(commit.notes)
        ? commit.notes.map((n) => ({ ...n, title: "BREAKING CHANGES" }))
        : [];

      return {
        ...commit,
        shortHash,
        notes,
      };
    },

    // context 가공도 새 객체로 반환
    finalizeContext: (context) => {
      // KST 기준 YYYY-MM-DD (원하면 'en-CA' 대신 다른 로케일 사용)
      const formattedDate = new Date().toLocaleDateString("en-CA", {
        timeZone: "Asia/Seoul",
      });
      return { ...context, formattedDate };
    },
  },
};
