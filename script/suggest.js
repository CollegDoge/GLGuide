const sections = {
    1: {
      title: "Incorrect Information",
      description: "Here's how to report incorrect or outdated content on this page. Below is an example of an appropriate issue template. Please refer to the READ ME for more instructions.",
      image: "../img/suggest1.png",
      buttonText: "Report Incorrect Info",
      buttonLink: "https://github.com/CollegDoge/GLGuide/issues"
    },
    2: {
      title: "Website Issue",
      description: "Steps to report broken pages, buttons, or layout issues. Below is an example of an appropriate issue template. Please refer to the READ ME for more instructions.",
      image: "../img/suggest2.png",
      buttonText: "Report a Bug",
      buttonLink: "https://github.com/CollegDoge/GLGuide/issues"
    },
    3: {
      title: "Suggest a Page",
      description: "Want to see a topic covered? Feel free to suggest a user page here. Below is an example of an appropriate discussion template. Please refer to the READ ME for more instructions.",
      image: "../img/suggest3.png",
      buttonText: "Suggest A Page",
      buttonLink: "https://github.com/CollegDoge/GLGuide/discussions"
    }
  };

  function openSection(sectionId) {
    const section = sections[sectionId];

    document.getElementById('suggest-text').innerHTML = `
      <h2>${section.title}</h2>
      <p>${section.description}</p>
    `;

    document.getElementById('suggest-img').innerHTML = `
      <img src="${section.image}" alt="${section.title}">
    `;

    document.getElementById('suggest-link').innerHTML = `
      <button class="buttonreg" onclick="window.open('${section.buttonLink}', '_blank')">${section.buttonText}</button>
    `;

    document.querySelectorAll('.button-section').forEach((btn, index) => {
      btn.classList.toggle('active', index === sectionId - 1);
    });
  }

  window.onload = () => openSection(1);