"use strict"

export const getCookie = name => {
  const value = ' ' + document.cookie
  const parts = value.split(' ' + name + '=')
  return parts.length < 2
    ? undefined
    : parts
        .pop()
        .split(';')
        .shift()
}

export const setCookie = function ( name, value, expiryDays, domain, path, secure = true ) {
  const exdate = new Date()
  exdate.setHours(exdate.getHours() + ((typeof expiryDays !== "number"  ? 365 : expiryDays ) * 24))
  document.cookie = name + '=' + value +
                    ';expires=' + exdate.toUTCString() +
                    ';path=' + (path || '/') +
                    ( domain ? ';domain=' + domain : '' ) +
                    ( secure ? ';secure' : '' )
}

export const deleteCookie = (name, attributes) => {
  if (getCookie(name)) {
    const { domain, path, secure } = attributes;

    setCookie(name, '', -1, domain, path, secure);
  }
}
