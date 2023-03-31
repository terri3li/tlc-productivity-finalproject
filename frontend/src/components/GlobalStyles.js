import { createGlobalStyle} from "styled-components"
export default createGlobalStyle`

  body, button {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: 'roboto mono', serif;
    transition: all 0.10s linear;
  }

  * {
    border: ${({ theme }) => theme.border};
  }
  
  html, h2, h3, h4, body, div, form, span, ul {
    border: none
  }

  h1 {
    background: ${({ theme }) => theme.header};
  }
  `


  
// lightTheme darkTheme

// moonlightBytes
// dark palette

// rockets
// pastel rocket candies

// mintCondition
// mint and gold

// dustySunrise
// bookmarks
