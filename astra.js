const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
}
const redirect = (href) => {
    window.location.href = href;
}