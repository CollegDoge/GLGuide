async function copyClip(element) {
  if (!element || !element.querySelector('a')) {
    console.error('Element or its child <a> not found.');
    return;
  }
  
  const copyButton = element.querySelector('a');
  const textToCopy = element.textContent.replace(copyButton.textContent, ''); // exclude the icon text from the copied text (just incase)

  try {
    await navigator.clipboard.writeText(textToCopy);
    console.log('Content copied to clipboard successfully!');

    copyButton.classList.remove('nf-oct-copy');
    copyButton.classList.add('nf-oct-check');

    setTimeout(() => {
      copyButton.classList.remove('nf-oct-check');
      copyButton.classList.add('nf-oct-copy');
    }, 2000); 

  } catch (err) {
    console.error('Failed to copy content:', err);
  }
}