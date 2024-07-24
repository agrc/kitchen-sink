import govOpsLogo from '../assets/govops-logo.webp';

export const Footer = () => (
  <>
    <section>
      <div className="grid grid-cols-1 justify-items-center gap-8 bg-zinc-600 p-8 text-center text-zinc-50 sm:grid-cols-3 sm:p-8 sm:text-left md:grid-cols-5">
        <div className="order-last col-span-1 justify-center text-center sm:col-span-3 md:order-first md:col-span-2 md:justify-self-start md:text-start">
          <div>
            <div className="max-w-xs">
              <img
                src={govOpsLogo}
                width="320"
                alt="Department of Government Operations"
              />
            </div>
            <div className="mt-4 text-lg">
              <div className="whitespace-nowrap font-semibold">
                Division of Technology Services
              </div>
              <div className="whitespace-nowrap font-medium">
                Utah Geospatial Resource Center
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div>4315 South 2700 West</div>
            <div>Taylorsville, UT 84129</div>
          </div>
        </div>
        <div>
          <div className="whitespace-nowrap font-bold">Main Menu</div>
          <ul className="grid gap-2 pl-1 text-sm leading-loose md:gap-0">
            <li className="mt-4 block">
              <a
                href="https://gis.utah.gov/"
                className="custom-style focus:ring-accent rounded hover:underline focus:outline-none focus:ring-1"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="https://gis.utah.gov/products/"
                className="custom-style focus:ring-accent rounded hover:underline focus:outline-none focus:ring-1"
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="https://gis.utah.gov/solutions/"
                className="custom-style focus:ring-accent rounded hover:underline focus:outline-none focus:ring-1"
              >
                Solutions
              </a>
            </li>
            <li>
              <a
                href="https://gis.utah.gov/documentation/"
                className="custom-style focus:ring-accent rounded hover:underline focus:outline-none focus:ring-1"
              >
                Documentation
              </a>
            </li>
            <li>
              <a
                href="https://gis.utah.gov/collaboration/"
                className="custom-style focus:ring-accent rounded hover:underline focus:outline-none focus:ring-1"
              >
                Collaboration
              </a>
            </li>
            <li>
              <a
                href="https://gis.utah.gov/blog/"
                className="custom-style focus:ring-accent rounded hover:underline focus:outline-none focus:ring-1"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="https://gis.utah.gov/about/"
                className="custom-style focus:ring-accent rounded hover:underline focus:outline-none focus:ring-1"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="https://gis.utah.gov/contact/"
                className="custom-style focus:ring-accent rounded hover:underline focus:outline-none focus:ring-1"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="whitespace-nowrap font-bold">Helpful Links</div>
          <ul className="grid gap-2 pl-1 text-sm leading-loose md:gap-0">
            <li className="mt-4 block">
              <a
                href="https://github.com/agrc/gis.utah.gov/blob/main/.github/contributing.md"
                className="custom-style focus:ring-accent rounded hover:underline focus:outline-none focus:ring-1"
              >
                Content contributing guide
              </a>
            </li>
            <li>
              <a
                href="https://gis.utah.gov/about/media/"
                className="custom-style focus:ring-accent rounded hover:underline focus:outline-none focus:ring-1"
              >
                Logos and media resources
              </a>
            </li>
            <li>
              <a
                href="https://gis.utah.gov/documentation/policy/"
                className="custom-style focus:ring-accent rounded hover:underline focus:outline-none focus:ring-1"
              >
                UGRC Policies
              </a>
            </li>
            <li>
              <a
                href="https://gis.utah.gov/about/code/"
                className="custom-style focus:ring-accent rounded hover:underline focus:outline-none focus:ring-1"
              >
                GIS-related Utah statute
              </a>
            </li>
            <li>
              <a
                href="https://s.utah.gov/ugrc-newsletter"
                className="custom-style focus:ring-accent rounded hover:underline focus:outline-none focus:ring-1"
              >
                Sign up for our newsletter
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="whitespace-nowrap font-bold">Website Information</div>
          <ul className="grid gap-2 pl-1 text-sm leading-loose md:gap-0">
            <li>
              <a
                href="https://gis.utah.gov/collaboration/community/contributors/"
                className="custom-style focus:ring-accent rounded hover:underline focus:outline-none focus:ring-1"
              >
                Contributors
              </a>
            </li>
            <li>
              <a
                href="https://github.com/agrc/gis.utah.gov/issues/new"
                className="custom-style focus:ring-accent rounded hover:underline focus:outline-none focus:ring-1"
              >
                Report an issue
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <div className="bg-zinc-600">
      <div className="mx-auto w-[calc(100%-2*32px)] border-0 border-b"></div>
      <div className="relative grid grid-cols-1 items-center justify-between p-8 md:grid-cols-2 lg:flex-row">
        <div className="flex flex-col items-center gap-4 divide-zinc-300 text-center lg:h-8 lg:flex-row lg:divide-x lg:text-left">
          <div className="h-full" id="utah-logo-svg">
            <svg
              className="block h-8 w-auto fill-white"
              viewBox="0 0 107 30.51"
              role="img"
            >
              <g>
                <path d="m12.44,30.51c-4.21,0-7.33-1.22-9.38-3.66C1.02,24.4,0,20.61,0,15.48V0h7.93v16.4c0,2.67.36,4.55,1.08,5.65.77,1.12,2.08,1.74,3.43,1.64,1.36.1,2.68-.52,3.48-1.63.75-1.09,1.13-2.97,1.13-5.65V0h7.65v15.48c0,5.13-1,8.92-3,11.36-2,2.44-5.09,3.66-9.26,3.66Zm24.42-.56V6.64h-7.93V0h23.78v6.64h-7.93v23.31h-7.92Zm26.17-14.56l-.51,2.07h5.53l-.51-2.07c-.37-1.44-.74-3.01-1.11-4.7-.37-1.69-.74-3.29-1.11-4.79h-.18c-.34,1.53-.68,3.14-1.04,4.82-.35,1.68-.71,3.24-1.08,4.68Zm-11.52,14.56L60.64,0h9.58l9.12,29.95h-8.39l-1.48-6.36h-8.38l-1.47,6.36h-8.11Zm30.69,0V0h7.93v11.15h8.94V0h7.93v29.95h-7.93v-11.89h-8.94v11.89h-7.93Z"></path>
              </g>
            </svg>
          </div>
          <div className="pl-4">
            <div className="text-lg font-semibold text-zinc-50">
              An official website of the{' '}
              <span className="whitespace-no-wrap">State of Utah</span>
            </div>
            <div className="text-sm text-zinc-50">© State of Utah</div>
          </div>
        </div>
        <div className="pt-6 text-center text-sm lg:pt-0">
          <div className="space-x-2 leading-10 text-zinc-50 lg:space-x-4">
            <a href="https://www.utah.gov" type="custom">
              Utah.gov Home
            </a>
            <span className="border-l-2" aria-hidden="true"></span>
            <a href="https://www.utah.gov/disclaimer.html" type="custom">
              Terms of Use
            </a>
            <span className="border-l-2" aria-hidden="true"></span>
            <a href="https://www.utah.gov/privacypolicy.html" type="custom">
              Privacy Policy
            </a>
            <span className="border-l-2" aria-hidden="true"></span>
            <a href="https://www.utah.gov/accessibility.html" type="custom">
              Accessibility
            </a>
            <span className="border-l-2" aria-hidden="true"></span>
            <a href="https://www.utah.gov/translate.html" type="custom">
              Translate
            </a>
          </div>
        </div>
      </div>
    </div>
  </>
);
