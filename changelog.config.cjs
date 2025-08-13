// changelog.config.cjs
module.exports = {
  // 기본 규칙은 Conventional Commits
  preset: "conventionalcommits",

  // 태그 접두사 (v1.2.3 형태 유지)
  tagPrefix: "v",

  // 0이면 전체, 1이면 최신 섹션만. CI에서는 보통 -r 1로 덮어써서 최신만 추가
  releaseCount: 0,

  // 커밋 타입 -> 섹션 매핑 (표시/숨김)
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

  // 링크 템플릿 (GitHub 저장소일 때 커밋/비교 링크 모양)
  commitUrlFormat: "{{host}}/{{owner}}/{{repository}}/commit/{{hash}}",
  compareUrlFormat:
    "{{host}}/{{owner}}/{{repository}}/compare/{{previousTag}}...{{currentTag}}",
  issueUrlFormat: "{{host}}/{{owner}}/{{repository}}/issues/{{id}}",

  // writerOpts로 헤더/커밋 라인/날짜 포맷 등을 커스터마이즈
  writerOpts: {
    // 헤더 템플릿: "## 1.2.3 (2025-08-12)" 형태
    headerPartial:
      "{{#if currentTag}}## {{currentTag}} ({{formattedDate}})\n{{/if}}",

    // 개별 커밋 라인 템플릿 예시: "* 설명 (abc123)"
    commitPartial:
      "* {{#if scope}}**{{scope}}:** {{/if}}{{subject}} ({{shortHash}})\n",

    // 날짜/필드 전처리
    transform: (commit, context) => {
      // 제목이 없으면 스킵
      if (!commit.subject) return commit;

      // BREAKING CHANGE 처리: 제목 앞에 ⚠️ 표기
      if (commit.notes && commit.notes.length) {
        commit.notes.forEach((note) => {
          note.title = "BREAKING CHANGES";
        });
      }

      // 커밋 해시 짧게
      commit.shortHash = commit.hash ? commit.hash.substring(0, 7) : "";

      // YYYY-MM-DD 포맷 (의존성 없이 처리)
      const yyyyMmDd = new Date().toISOString().slice(0, 10);
      context.formattedDate = yyyyMmDd;

      return commit;
    },
  },
};
