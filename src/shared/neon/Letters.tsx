/**
 * Splits a phrase into word-wrapped, per-letter spans (`.yk-word` > `.yk-char`) for title
 * reveals. Render it inside an aria-hidden element next to an sr-only copy of the text.
 */
export const Letters = ({ text }: { text: string }) =>
  text.split(' ').map((word, wordIndex) => (
    <span key={wordIndex} className="yk-hero-word yk-word">
      {word.split('').map((letter, index) => (
        <span key={index} className="yk-hero-char yk-char">
          {letter}
        </span>
      ))}
    </span>
  ))
