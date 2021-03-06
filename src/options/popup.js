"use strict"

import {
  STATUS_DENY, STATUS_ALLOW, STATUS_DISMISS, CATEGORIES,
  CATEGORY_UNCATEGORIZED, CATEGORY_ESSENTIAL, CATEGORY_PERSONALIZATION, CATEGORY_ANALYTICS,
  CATEGORY_MARKETING
} from "../constants/index.js"

const categoryVariablesNames = {
  [CATEGORY_ANALYTICS]: 'categoryAnalytics',
  [CATEGORY_ESSENTIAL]: 'categoryEssential',
  [CATEGORY_MARKETING]: 'categoryMarketing',
  [CATEGORY_PERSONALIZATION]: 'categoryPersonalization',
  [CATEGORY_UNCATEGORIZED]: 'categoryUncategorized'
}

export const categoryDisplayNamesVariablesNames = {
  [CATEGORY_ANALYTICS]: 'categoryAnalyticsDisplayName',
  [CATEGORY_ESSENTIAL]: 'categoryEssentialDisplayName',
  [CATEGORY_MARKETING]: 'categoryMarketingDisplayName',
  [CATEGORY_PERSONALIZATION]: 'categoryPersonalizationDisplayName',
  [CATEGORY_UNCATEGORIZED]: 'categoryUncategorizedDisplayName'
}

export default {
  // if false, this prevents the popup from showing (useful for giving to control to another piece of code)
  enabled: true,

  // optional (expecting a HTML element) if passed, the popup is appended to this element. default is `document.body`
  container: null,

  // defaults cookie options - it is RECOMMENDED to set these values to correspond with your server
  cookie: {
    // This is the name of this cookie - you can ignore this
    name: 'cookieconsent_status',
    // This is the url path that the cookie 'name' belongs to. The cookie can only be read at this location
    path: '/',
    // This is the domain that the cookie 'name' belongs to. The cookie can only be read on this domain.
    //  - Guide to cookie domains - https://www.mxsasha.eu/blog/2014/03/04/definitive-guide-to-cookie-domains/
    domain: 'localhost',
    // The cookies expire date, specified in days (specify -1 for no expiry)
    expiryDays: 365,
    // If true the cookie will be created with the secure flag. Secure cookies will only be transmitted via HTTPS.
    secure: true,
    // Sets the "sameSite"-Attribute of the `cookieconsent_status`-Cookie allowed attributes are "Lax", "Strict" and "None" ("None" is only allowed with the `Secure`-flag)
    sameSite: 'None'
  },

  // each item defines the inner text for the element that it references
  content: {
    header : 'Cookies used on the website!',
    message: `We would like to measure how you browse our website to constantly improve it, based on your usage patterns. To accomplish this, we must store cookies on your device. If you're cool with that, hit "Accept all cookies". For more information and to customize your settings, hit "Customize settings".`,
    dismiss: 'Got it!',
    allow  : 'Accept all cookies',
    deny   : 'Decline',
    link   : 'Learn more',
    href   : 'https://www.cookiesandyou.com',
    close  : '&#x274c',
    target : '_blank',
    policy: 'Cookie Policy',
    customize: 'Customize settings',
    customizeHeader: 'Review and manage your consent',
    customizeMessage: `Here is an overview of the cookies we use on this site. Please select categories that you are OK with. You can always change your choices at any time, by hitting the "Manage your consent options" link on the site's footer.`,
    acceptSelected: 'Accept selected',
    categoryAnalytics: 'These cookies collect information to help us understand how our website is being used. They allow us to count unique visits and see from where visitors came from. With this information, we can measure and improve the content of our site. We can also see how users navigate between pages and what actions they take.',
    categoryEssential: `These cookies are necessary to make this site run properly and securely. For example, with this kind of cookies, we register your cookie preferences so that you won't be seeing this pop-up next time you visit our page and we can keep track which categories you have opted-in.
To keep this site secure, we use <a class="cc-link" href="https://www.cloudflare.com/privacypolicy/" rel="noopener noreferrer" target="_blank">Cloudflare</a> content delivery network and security solutions. The service may place a unique cookie to identify your browser and device to make sure no automated programs can impose security threats on our site.`,
    categoryPersonalization: '[Personalization category read more message]',
    categoryMarketing: '[Marketing category read more message]',
    categoryUncategorized: '[Uncategorized category read more message]',
    cookiePolicyLink: '',
    privacyPolicyLink: '',
    policiesLinkRel: 'noopener noreferrer nofollow',
    categoryUncategorizedDisplayName: 'Uncategorized',
    categoryEssentialDisplayName: 'Necessary (always active)',
    categoryPersonalizationDisplayName: 'Personalization',
    categoryAnalyticsDisplayName: 'Analytics',
    categoryMarketingDisplayName: 'Marketing'
  },

  // This is the HTML for the elements above. The string {{header}} will be replaced with the equivalent text below.
  // You can remove "{{header}}" and write the content directly inside the HTML if you want.
  //
  //  - ARIA rules suggest to ensure controls are tabbable (so the browser can find the first control),
  //    and to set the focus to the first interactive control (https://w3c.github.io/using-aria/)
  elements: {
    header: '<span class="cc-header">{{header}}</span>&nbsp',
    message:
      '<span id="cookieconsent:desc" class="cc-message">{{message}}</span>',
    messagelink:
      '<span id="cookieconsent:desc" class="cc-message">{{message}} <a aria-label="learn more about cookies" role=button tabindex="0" class="cc-link" href="{{href}}" rel="noopener noreferrer nofollow" target="{{target}}">{{link}}</a></span>',
    dismiss:
      `<a aria-label="dismiss cookie message" role=button tabindex="0" class="cc-btn cc-${STATUS_DISMISS}">{{dismiss}}</a>`,
    allow:
      `<a aria-label="allow cookies" role=button tabindex="0"  class="cc-btn cc-${STATUS_ALLOW}">{{allow}}</a>`,
    deny:
      `<a aria-label="deny cookies" role=button tabindex="0" class="cc-btn cc-${STATUS_DENY}">{{deny}}</a>`,
    link:
      '<a aria-label="learn more about cookies" role=button tabindex="0" class="cc-link" href="{{href}}" rel="noopener noreferrer nofollow" target="{{target}}">{{link}}</a>',
    close:
      '<span aria-label="dismiss cookie message" role=button tabindex="0" class="cc-close">{{close}}</span>',
    categories: '<ul class="cc-categories">' +
      CATEGORIES.map( ( category, index ) =>
        `<li class="cc-category">
          <button class="cc-btn" tabindex="0"><input type="checkbox" name="${category}"/><span class="cc-btn-checkbox"></span>${category}</button>
          <button class="cc-btn cc-info" aria-label="${category} Definition Button" tabindex="${index+1}">^</button>
          <div class="cc-tooltip">
            <p>This is the category for cookies that don't fit the '${category.toLowerCase()}' category.</p>
          </div>
        </li>`
      ).join("")
      + '</ul>',
    save: `<button class="cc-btn cc-save">Save</button>`,
    customize: `<button class="cc-btn cc-customize">{{customize}}</button>`,
    customizeHeader: `<div class="cc-customize-header">{{customizeHeader}}</div>`,
    customizeMessage: `<div class="cc-customize-message">{{customizeMessage}}</div>`,
    acceptSelected: `<div class="cc-compliance">
        <span class="cc-accept-selected">
          <button class="cc-btn cc-save">{{acceptSelected}}</button>
        </span>
      </div>`,
    customizeCategories: `<ul class="cc-customize-categories">` +
      CATEGORIES.map(category =>
        `<li class="cc-category ${category}">
           <label>
             <input type="checkbox" id="${category}" name="${category}"/>
             <span class="cc-btn-checkbox">{{${categoryDisplayNamesVariablesNames[category]}}}</span>
           </label>
           <label class="cc-readmore" for="readmore-${category}">Read more</label>
           <input id="readmore-${category}" type="checkbox"> 
           <div class="cc-more-info">{{${categoryVariablesNames[category]}}}</div>
        </li>`
      ).join("")
      + '</ul>',
    policiesLinks: `<div class="cc-policies-links">For more information, please see our 
      <a class="cc-link" href="{{cookiePolicyLink}}" rel="{{policiesLinkRel}}" target="_blank">Cookie Policy</a> and 
      <a class="cc-link" href="{{privacyPolicyLink}}" rel="{{policiesLinkRel}}" target="_blank">Privacy Policy</a>.</div>`
    //compliance: compliance is also an element, but it is generated by the application, depending on `type` below
  },

  // The placeholders {{classes}} and {{children}} both get replaced during initialisation:
  //  - {{classes}} is where additional classes get added
  //  - {{children}} is where the HTML children are placed
  window:
    '<div role="dialog" aria-live="polite" aria-label="cookieconsent" aria-describedby="cookieconsent:desc" class="cc-window {{classes}}"><!--googleoff: all-->{{children}}<!--googleon: all--></div>',
  
  modal: '',

  // This is the html for the revoke button. This only shows up after the user has selected their level of consent
  // It can be enabled of disabled using the `revokable` option
  revokeBtn: '<div class="cc-revoke {{classes}}">{{policy}}</div>',

  // define types of 'compliance' here. '{{value}}' strings in here are linked to `elements`
  compliance: {
    info: '<div class="cc-compliance">{{dismiss}}</div>',
    'opt-in':
      '<div class="cc-compliance cc-highlight cc-customize">{{customize}}{{allow}}</div>',
    'opt-out':
      '<div class="cc-compliance cc-highlight">{{dismiss}}{{deny}}</div>',
    categories: '<div class="form">{{categories}}{{save}}</div>'
  },

  // select your type of popup here
  type: 'info', // refers to `compliance` (in other words, the buttons that are displayed)

  // define layout layouts here
  layouts: {
    // the 'block' layout tend to be for square floating popups
    basic         : '{{messagelink}}{{compliance}}',
    'basic-close' : '{{messagelink}}{{compliance}}{{close}}',
    'basic-header': '{{header}}{{message}}{{link}}{{compliance}}',
    categories: `<div class="cc-main-content">
        {{message}}
        <div class="content-footer">
          {{policiesLinks}}{{compliance}}
        </div>
      </div>
      <div class="cc-customize-content">
        {{customizeHeader}}
        {{customizeMessage}}
        {{customizeCategories}}
        <div class="content-footer">
          {{policiesLinks}}
          {{acceptSelected}}
        </div>
      </div>`
    // add a custom layout here, then add some new css with the class '.cc-layout-my-cool-layout'
    //'my-cool-layout': '<div class="my-special-layout">{{message}}{{compliance}}</div>{{close}}',
  },

  // default layout (see above)
  layout: 'basic',

  // this refers to the popup windows position. we currently support:
  //  - banner positions: top, bottom
  //  - floating positions: top-left, top-right, bottom-left, bottom-right
  //
  // adds a class `cc-floating` or `cc-banner` which helps when styling
  position: 'bottom', // default position is 'bottom'

  // Available styles
  //    -block (default, no extra classes)
  //    -edgeless
  //    -classic
  // use your own style name and use `.cc-theme-STYLENAME` class in CSS to edit.
  // Note: style "wire" is used for the configurator, but has no CSS styles of its own, only palette is used.
  theme: 'block',

  // The popup is `fixed` by default, but if you want it to be static (inline with the page content), set this to false
  // Note: by default, we animate the height of the popup from 0 to full size
  static: false,

  // if you want custom colours, pass them in here. this object should look like this.
  // ideally, any custom colours/themes should be created in a separate style sheet, as this is more efficient.
  //   {
  //     popup: {background: '#000000', text: '#fff', link: '#fff'},
  //     button: {background: 'transparent', border: '#f8e71c', text: '#f8e71c'},
  //     highlight: {background: '#f8e71c', border: '#f8e71c', text: '#000000'},
  //   }
  // `highlight` is optional and extends `button`. if it exists, it will apply to the first button
  // only background needs to be defined for every element. if not set, other colors can be calculated from it
  palette: null,

  // Some countries REQUIRE that a user can change their mind. You can configure this yourself.
  // Most of the time this should be false, but the `cookieconsent.legal` can change this to `true` if it detects that it should
  revokable: false,

  // if true, the revokable button will tranlate in and out
  animateRevokable: true,

  // used to disable link on existing layouts
  // replaces element messagelink with message and removes content of link
  showLink: true,

  // set value as scroll range to enable
  dismissOnScroll: false,

  // set value as time in milliseconds to autodismiss after set time
  dismissOnTimeout: false,

  // set value as click anything on the page, excluding the `ignoreClicksFrom` below (if we click on the revoke button etc)
  dismissOnWindowClick: false,

  // set value as click anything on the page, excluding the `ignoreClicksFrom` below (if we click on the revoke button etc)
  dismissOnLinkClick: false,

  // set value as keys are pressed, ( allowKeyCode = 13, denyKeyCode = 27 )
  dismissOnKeyPress: false,

  // If `dismissOnWindowClick` is true, we can click on 'revoke' and we'll still dismiss the banner, so we need exceptions.
  // should be an array of class names (not CSS selectors)
  ignoreClicksFrom: ['cc-revoke', 'cc-btn', 'cc-link'], // already includes the revoke button and the banner itself

  // The application automatically decide whether the popup should open.
  // Set this to false to prevent this from happening and to allow you to control the behaviour yourself
  autoOpen: true,

  // By default the created HTML is automatically appended to the container (which defaults to <body>). You can prevent this behaviour
  // by setting this to false, but if you do, you must attach the `element` yourself, which is a public property of the popup instance:
  //
  //     const instance = cookieconsent.factory(options)
  //     document.body.appendChild(instance.element)
  //
  autoAttach: true,

  // set value if floating layout should be forced for mobile devices
  mobileForceFloat: true,

  // simple whitelist/blacklist for pages. specify page by:
  //   - using a string : '/index.html'           (matches '/index.html' exactly) OR
  //   - using RegExp   : /\/page_[\d]+\.html/    (matched '/page_1.html' and '/page_2.html' etc)
  whitelistPage: [],
  blacklistPage: [],

  // If this is defined, then it is used as the inner html instead of layout. This allows for ultimate customisation.
  // Be sure to use the classes `cc-btn` and `cc-ALLOW`, `cc-DENY` or `cc-DISMISS`. They enable the app to register click
  // handlers. You can use other pre-existing classes too. See `src/styles` folder.
  overrideHTML: null,

  // element id that is used to open consent pop-up to review and change user consent
  consentSettingsElementId: null,

  // categories to be shown and used
  showCategories: {
    [CATEGORY_UNCATEGORIZED]: true,
    [CATEGORY_ESSENTIAL]: true,
    [CATEGORY_PERSONALIZATION]: true,
    [CATEGORY_ANALYTICS]: true,
    [CATEGORY_MARKETING]: true
  }
}
