const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <p>© {currentYear} Pixell River Financial</p>
        </footer>
    );
}

export default Footer;