/**
 * Saves the original favicon on the <link> elem if we don't already have a reference to it.
 *
 * @param linkElem The <link> elem.
 * @returns
 */
export const saveOriginalFavicon = (linkElem: HTMLLinkElement) => {
	if (linkElem.getAttribute('data-original-href') === null) {
		linkElem.setAttribute('data-original-href', linkElem.href);
	}
};
