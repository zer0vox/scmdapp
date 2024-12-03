
function Footer() {
  // if (location.pathname === "/login" || location.pathname === "/signup") {
  //   return <></>;
  // }

  return (
    <>
      <section className="bg-white bottom-0 left-0 w-full">
        <div className="max-w-screen-xl px-4 py-10 mx-auto space-y-4 overflow-hidden sm:px-6 lg:px-8">
          <nav className="flex flex-wrap justify-center -mx-5 -my-1">
            <div className="px-5 py-[0.27rem]">
             
              <a
                href="https://github.com/zer0vox"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base leading-6 text-gray-500 hover:text-gray-900"
              >
                Github
              </a>
            </div>
          </nav>
          <p className="text-base leading-6 text-center text-gray-400">
            © 2024 Copyright All rights reserved | MIT License
          </p>
        </div>
      </section>
    </>
  );
}

export default Footer;
