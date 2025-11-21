"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfficialUtahWebsite = exports.NaturalResourcesAddress = exports.GovOpsAddress = exports.Footer = exports.dnrStandardLinks = void 0;
var govops_logo_webp_1 = require("../assets/govops-logo.webp");
var natural_resources_logo_webp_1 = require("../assets/natural-resources-logo.webp");
var Link_tsx_1 = require("./Link.tsx");
var ugrcStandardLinks = {
    columnOne: {
        title: 'Main menu',
        links: [
            {
                url: 'https://gis.utah.gov/',
                title: 'Home',
            },
            {
                url: 'https://gis.utah.gov/products/',
                title: 'Products',
            },
            {
                url: 'https://gis.utah.gov/solutions/',
                title: 'Solutions',
            },
            {
                url: 'https://gis.utah.gov/documentation/',
                title: 'Documentation',
            },
            {
                url: 'https://gis.utah.gov/collaboration/',
                title: 'Collaboration',
            },
            {
                url: 'https://gis.utah.gov/blog/',
                title: 'Blog',
            },
            {
                url: 'https://gis.utah.gov/about/',
                title: 'About',
            },
            {
                url: 'https://gis.utah.gov/contact/',
                title: 'Contact',
            },
        ],
    },
    columnTwo: {
        title: 'Helpful links',
        links: [
            {
                url: 'https://github.com/agrc/gis.utah.gov/blob/main/.github/contributing.md',
                title: 'Content contributing guide',
            },
            {
                url: 'https://gis.utah.gov/about/media/',
                title: 'Logos and media resources',
            },
            {
                url: 'https://gis.utah.gov/documentation/policy/',
                title: 'UGRC Policies',
            },
            {
                url: 'https://gis.utah.gov/about/code/',
                title: 'GIS-related Utah statute',
            },
            {
                url: 'https://s.utah.gov/ugrc-newsletter',
                title: 'Sign up for our newsletter',
            },
        ],
    },
    columnThree: {
        title: 'Website information',
        links: [
            {
                url: 'https://gis.utah.gov/collaboration/community/contributors/',
                title: 'Contributors',
            },
            {
                url: 'https://github.com/agrc/gis.utah.gov/issues/new',
                title: 'Report an issue',
            },
        ],
    },
};
var dnrStandardLinks = function (_a) {
    var repository = _a.repository;
    var columnThree = {
        title: 'Website information',
        links: [
            {
                url: "https://gis.utah.gov/solutions/",
                title: 'Built by UGRC 📍',
            },
        ],
    };
    if (repository) {
        columnThree.links.push({
            url: "https://github.com/".concat(repository, "/issues/new"),
            title: 'Report an issue',
        });
    }
    return {
        columnOne: {
            title: 'Main menu',
            links: [
                {
                    url: 'https://naturalresources.utah.gov/',
                    title: 'Home',
                },
                {
                    url: 'https://naturalresources.utah.gov/home/we-are-dnr/',
                    title: 'About',
                },
                {
                    url: 'https://naturalresources.utah.gov/employment/',
                    title: 'Employment',
                },
                {
                    url: 'https://naturalresources.utah.gov/category/dnr-newsfeed/',
                    title: 'News',
                },
                {
                    url: 'https://naturalresources.utah.gov/contact-us/',
                    title: 'Contact us',
                },
            ],
        },
        columnTwo: {
            title: 'Online services',
            links: [
                {
                    url: 'https://parkspass.utah.gov/parks/PANUAL/dayuse',
                    title: 'Buy an Annual Parks Pass',
                },
                {
                    url: 'https://stateparks.utah.gov/parks/',
                    title: 'Find a State Park',
                },
                {
                    url: 'https://www.utahmapstore.com/',
                    title: 'Map & Bookstore',
                },
                {
                    url: 'https://docs.google.com/forms/d/e/1FAIpQLSetj-yoOg9OWktL2TWGeegAEda2CkcisHLTav7XxrxzVPwCsA/viewform',
                    title: 'Report Water Waste',
                },
                {
                    url: 'https://wildlife.utah.gov/report-a-poacher.html',
                    title: 'Turn-in-a-Poacher',
                },
                {
                    url: 'https://docs.google.com/forms/d/e/1FAIpQLSetj-yoOg9OWktL2TWGeegAEda2CkcisHLTav7XxrxzVPwCsA/viewform',
                    title: 'Water-saving Rebates & Resources',
                },
                {
                    url: 'https://wildlife.utah.gov/',
                    title: 'Wildlife Resources',
                },
            ],
        },
        columnThree: columnThree,
    };
};
exports.dnrStandardLinks = dnrStandardLinks;
var Footer = function (_a) {
    var _b = _a.renderAddress, renderAddress = _b === void 0 ? function () { return <exports.GovOpsAddress />; } : _b, _c = _a.columnOne, columnOne = _c === void 0 ? ugrcStandardLinks.columnOne : _c, _d = _a.columnTwo, columnTwo = _d === void 0 ? ugrcStandardLinks.columnTwo : _d, _e = _a.columnThree, columnThree = _e === void 0 ? ugrcStandardLinks.columnThree : _e;
    return (<>
    <section>
      <div className="grid grid-cols-1 justify-items-center gap-8 bg-zinc-600 p-8 text-center text-zinc-50 sm:grid-cols-3 sm:p-8 sm:text-left md:grid-cols-5">
        {renderAddress()}
        <div>
          <div className="whitespace-nowrap font-bold">{columnOne.title}</div>
          <ul className="grid gap-2 pl-1 text-sm leading-loose md:gap-0">
            {columnOne.links.map(function (link, index) { return (<li className={index === 0 ? 'mt-4 block' : undefined} key={link.title}>
                <Link_tsx_1.Link href={link.url} variant="secondary" quiet={true}>
                  {link.title}
                </Link_tsx_1.Link>
              </li>); })}
          </ul>
        </div>
        <div>
          <div className="whitespace-nowrap font-bold">{columnTwo.title}</div>
          <ul className="grid gap-2 pl-1 text-sm leading-loose md:gap-0">
            {columnTwo.links.map(function (link, index) { return (<li key={link.title} className={index === 0 ? 'mt-4 block' : undefined}>
                <Link_tsx_1.Link href={link.url} variant="secondary" quiet={true}>
                  {link.title}
                </Link_tsx_1.Link>
              </li>); })}
          </ul>
        </div>
        <div>
          <div className="whitespace-nowrap font-bold">{columnThree.title}</div>
          <ul className="grid gap-2 pl-1 text-sm leading-loose md:gap-0">
            {columnThree.links.map(function (link, index) { return (<li key={link.title} className={index === 0 ? 'mt-4 block' : undefined}>
                <Link_tsx_1.Link href={link.url} variant="secondary" quiet={true}>
                  {link.title}
                </Link_tsx_1.Link>
              </li>); })}
          </ul>
        </div>
      </div>
    </section>
    <exports.OfficialUtahWebsite />
  </>);
};
exports.Footer = Footer;
var GovOpsAddress = function () { return (<div className="order-last col-span-1 justify-center text-center sm:col-span-3 md:order-first md:col-span-2 md:justify-self-start md:text-start">
    <div>
      <div className="max-w-xs">
        <img src={govops_logo_webp_1.default} width="320" alt="Department of Government Operations" loading="lazy"/>
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
  </div>); };
exports.GovOpsAddress = GovOpsAddress;
var NaturalResourcesAddress = function () { return (<div className="order-last col-span-1 justify-center text-center sm:col-span-3 md:order-first md:col-span-2 md:justify-self-start md:text-start">
    <div>
      <div className="max-w-xs">
        <img src={natural_resources_logo_webp_1.default} width="100" height="115" alt="Utah Department of Natural Resources logo" loading="lazy"/>
      </div>
      <div className="mt-4 text-lg">
        <div className="whitespace-nowrap font-semibold">
          Department of Natural Resources
        </div>
      </div>
    </div>
    <div className="mt-4">
      <div>1594 W. North Temple</div>
      <div>Salt Lake City, Utah 84114</div>
    </div>
    <div className="mt-4">
      <div>Phone: (801) 538-7200</div>
      <div>Email: dnr@utah.gov</div>
    </div>
  </div>); };
exports.NaturalResourcesAddress = NaturalResourcesAddress;
var OfficialUtahWebsite = function () { return (<div className="bg-zinc-600">
    <div className="mx-auto w-[calc(100%-2*32px)] border-0 border-b"></div>
    <div className="relative grid grid-cols-1 items-center justify-between p-8 md:grid-cols-2 lg:flex-row">
      <div className="flex flex-col items-center gap-4 divide-zinc-300 text-center lg:h-8 lg:flex-row lg:divide-x lg:text-left">
        <div className="h-full" id="utah-logo-svg">
          <svg className="block h-8 w-auto fill-white" viewBox="0 0 107 30.51" role="img">
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
          <Link_tsx_1.Link href="https://www.utah.gov" variant="secondary" quiet={true}>
            Utah.gov Home
          </Link_tsx_1.Link>
          <span className="border-l-2" aria-hidden="true"></span>
          <Link_tsx_1.Link href="https://www.utah.gov/disclaimer.html" variant="secondary" quiet={true}>
            Terms of Use
          </Link_tsx_1.Link>
          <span className="border-l-2" aria-hidden="true"></span>
          <Link_tsx_1.Link href="https://www.utah.gov/privacypolicy.html" variant="secondary" quiet={true}>
            Privacy Policy
          </Link_tsx_1.Link>
          <span className="border-l-2" aria-hidden="true"></span>
          <Link_tsx_1.Link href="https://www.utah.gov/accessibility.html" variant="secondary" quiet={true}>
            Accessibility
          </Link_tsx_1.Link>
          <span className="border-l-2" aria-hidden="true"></span>
          <Link_tsx_1.Link href="https://www.utah.gov/translate.html" variant="secondary" quiet={true}>
            Translate
          </Link_tsx_1.Link>
        </div>
      </div>
    </div>
  </div>); };
exports.OfficialUtahWebsite = OfficialUtahWebsite;
