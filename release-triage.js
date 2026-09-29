(function () {
  const tabs = Array.from(document.querySelectorAll('[data-stage-tab]'));
  const panels = Array.from(document.querySelectorAll('[data-stage-panel]'));
  const names = new Set(panels.map((panel) => panel.dataset.stagePanel));

  function requestedStage() {
    const name = window.location.hash.slice(1);
    return names.has(name) ? name : 'build';
  }

  function updateProgress(panel) {
    const checks = Array.from(panel.querySelectorAll('[data-check]'));
    const done = checks.filter((check) => check.checked).length;
    panel.querySelector('[data-progress]').textContent =
      done + ' of ' + checks.length + ' checks reviewed';
  }

  function show(stage) {
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.stagePanel !== stage;
      updateProgress(panel);
    });
    tabs.forEach((tab) => {
      if (tab.dataset.stageTab === stage) tab.setAttribute('aria-current', 'step');
      else tab.removeAttribute('aria-current');
    });
  }

  function select(stage) {
    if (!names.has(stage)) return;
    show(stage);
    window.history.pushState(null, '', '#' + stage);
    document.getElementById('stages').scrollIntoView({ block: 'start' });
  }

  tabs.forEach((tab) => tab.addEventListener('click', (event) => {
    event.preventDefault();
    select(tab.dataset.stageTab);
  }));

  document.querySelectorAll('[data-jump]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      select(link.dataset.jump);
    });
  });

  document.querySelectorAll('[data-check]').forEach((check) => {
    check.addEventListener('change', () => updateProgress(check.closest('[data-stage-panel]')));
  });

  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const command = button.closest('.command').querySelector('code').textContent.trim();
      try {
        await navigator.clipboard.writeText(command);
        button.textContent = 'Copied';
      } catch {
        button.textContent = 'Select text';
      }
      window.setTimeout(() => { button.textContent = 'Copy'; }, 2000);
    });
  });

  window.addEventListener('popstate', () => show(requestedStage()));
  window.addEventListener('hashchange', () => show(requestedStage()));
  show(requestedStage());
})();
