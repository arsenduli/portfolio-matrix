
// A simplified implementation of GSAP's SplitText

export class SplitText {
  private element: HTMLElement;
  private options: { type: string };
  public chars: HTMLElement[] = [];
  public words: HTMLElement[] = [];
  public lines: HTMLElement[] = [];
  private originalHTML: string;

  constructor(element: HTMLElement, options = { type: "chars,words,lines" }) {
    this.element = element;
    this.options = options;
    this.originalHTML = element.innerHTML;
    this.split();
  }

  private split() {
    const types = this.options.type.split(",");
    let html = this.originalHTML;

    if (types.includes("words") || types.includes("lines")) {
      // Split into words
      const wordSplit = html.replace(/(<[^>]+>|\S+)/g, "<div class='word'>$1</div>");
      this.element.innerHTML = wordSplit;
      this.words = Array.from(this.element.querySelectorAll('.word'));
    }

    if (types.includes("chars")) {
      // Further split words into characters
      this.words.forEach(word => {
        const text = word.innerHTML;
        let charHTML = '';
        
        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ') {
            charHTML += ' ';
          } else {
            charHTML += `<div class='char'>${text[i]}</div>`;
          }
        }
        
        word.innerHTML = charHTML;
      });
      
      this.chars = Array.from(this.element.querySelectorAll('.char'));
    }

    if (types.includes("lines")) {
      // Group words into lines (simplified approach)
      let currentTop = null;
      let currentLine: HTMLElement[] = [];
      let lineCounter = 0;
      
      this.words.forEach((word, i) => {
        const rect = word.getBoundingClientRect();
        
        if (currentTop === null || rect.top >= currentTop + 5) {
          currentTop = rect.top;
          if (currentLine.length > 0) {
            const lineDiv = document.createElement('div');
            lineDiv.className = 'line';
            lineDiv.style.position = 'relative';
            this.lines.push(lineDiv);
            lineCounter++;
          }
          currentLine = [word];
        } else {
          currentLine.push(word);
        }
        
        word.setAttribute('data-line', lineCounter.toString());
      });
    }
  }

  public revert() {
    this.element.innerHTML = this.originalHTML;
  }
}
