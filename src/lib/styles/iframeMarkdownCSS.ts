export default `body {
    color: white;
}


* {
    font-family: Sora, sans-serif;
    font-display: swap;
}

@font-face {
	font-family: Sora;
	src: url('/fonts/Sora-VariableFont_wght.ttf') format('truetype');
	font-weight: 100 900;
	font-style: normal;
}

a {
    color: #00b9ff;
}

/* Style for inline code */
code {
    background-color: #2d2d2d; /* Slightly lighter than the background for contrast */
    color: #c0c5ce; /* A light gray color for the code text */
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: 'Courier New', Courier, monospace; /* A common monospace font */
}

/* Style for code blocks */
pre {
    background-color: #2d2d2d; /* Same as inline code, for consistency */
    color: #c0c5ce;
    padding: 1em;
    overflow-x: auto; /* Allows horizontal scrolling if the code is too wide */
    border-radius: 5px;
}

/* Style for blockquotes */
blockquote {
    border-left: 4px solid #00b9ff; /* A blue left border for style */
    background-color: #2f2f2f; /* Slightly different background to stand out */
    padding: 0.5em 1em;
    margin: 0.5em 0;
    color: #d1d1d1; /* A softer white for the text */
}

/* Style for lists */
ul, ol {
    padding-left: 20px; /* Indentation for list items */
    color: #d1d1d1; /* Same as blockquote for consistency */
}

/* Style for list items */
li {
    margin-bottom: 0.5em; /* Space between list items */
}

/* Style for headers */
h1, h2, h3, h4, h5, h6 {
    color: #ffffff; /* Pure white for headers to stand out */
    margin-top: 1em;
    margin-bottom: 0.5em;
}

h1 {
    font-size: 2em; /* Largest header */
}

h2 {
    font-size: 1.5em;
}

h3 {
    font-size: 1.17em;
}

h4 {
    font-size: 1em;
}

h5 {
    font-size: 0.83em;
}

h6 {
    font-size: 0.67em;
}

/* Style for horizontal rules */
hr {
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(255, 255, 255, 0.75), rgba(0, 0, 0, 0));
    margin: 1em 0;
}
`;
