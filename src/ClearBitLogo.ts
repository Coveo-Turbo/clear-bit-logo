import {
    Component,
    IComponentBindings,
    ComponentOptions,
    IResultsComponentBindings,
    IFieldOption,
    IQueryResult
} from 'coveo-search-ui';
import { lazyComponent } from '@coveops/turbo-core';

export interface IClearBitLogoOptions {
    /**
    * Specifies the field that the ClearBitLogo look for.
    *
    * Specifying a value for this parameter is required in order for the ClearBitLogo component to work.
    */
    field?: IFieldOption;
    /**
     * Size of the icon.
     */
    size?: number;
}

/**
* The ClearBitLogo component outputs the corresponding company logo for a given field. The component searches for a suitable Company logo
* from those available using the Clearbit logo API which allows you to quickly lookup company logos using just their domain. If the component finds no suitable logo, it instead
* outputs a generic one.
*
* This component is a result template component (see [Result Templates](https://docs.coveo.com/en/413/)).
*/
@lazyComponent
export class ClearBitLogo extends Component {
    static ID = 'ClearBitLogo';
    static NO_IMAGE_URL = 'data:image/svg+xml;charset=utf8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjI1cHgiIGhlaWdodD0iMjI1cHgiIHZpZXdCb3g9IjAgMCAyMjUgMjI1IiB2ZXJzaW9uPSIxLjEiPgo8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzOC4wMDAwMDAsIDM4LjAwMDAwMCkiIGZpbGw9IiNFQUVBRUEiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgIDxwYXRoIGQ9Ik0wLDc1LjAwMDI5MyBDMCwxMTYuNDIxMDk0IDMzLjU3ODMyMDMsMTUwIDc1LDE1MCBDMTE2LjQyMDgwMSwxNTAgMTUwLDExNi40MjEzODcgMTUwLDc1LjAwMDU4NTkgQzE0OS45OTk0MTQsMzMuNTc5NDkyMiAxMTYuNDIwODAxLDAgNzUsMCBDMzMuNTc4MzIwMywwIDAsMzMuNTc5NDkyMiAwLDc1LjAwMDI5MyBaIE0xMzcuNDk3ODUyLDc1LjAwMDI5MyBDMTM3LjQ5Nzg1Miw4OS4zOTAzMzIgMTMyLjYzMTM0OCwxMDIuNjQyNDggMTI0LjQ1NzgxMywxMTMuMjA2NjQxIEwzNi43OTI3NzM0LDI1LjU0MjE4NzUgQzQ3LjM1NzUxOTUsMTcuMzY5MjM4MyA2MC42MTAyNTM5LDEyLjUwMjE0ODQgNzUsMTIuNTAyMTQ4NCBDMTA5LjUxNTgyLDEyLjUwMjE0ODQgMTM3LjQ5NzI2Niw0MC40ODM4ODY3IDEzNy40OTc4NTIsNzUuMDAwMjkzIFogTTEyLjUwMTg1NTUsNzUuMDAwMjkzIEMxMi41MDE4NTU1LDU5LjM1OTg2MzMgMTguMjQ2OTcyNyw0NS4wNjE1MjM0IDI3Ljc0MTc5NjksMzQuMTAwMzkwNiBMMTE1Ljg5OTAyMywxMjIuMjU3OTEgQzEwNC45Mzc4OTEsMTMxLjc1MjQ0MSA5MC42Mzk1NTA4LDEzNy40OTc1NTkgNzQuOTk5NzA3LDEzNy40OTc1NTkgQzQwLjQ4MzU5MzgsMTM3LjQ5ODE0NSAxMi41MDE4NTU1LDEwOS41MTY0MDYgMTIuNTAxODU1NSw3NS4wMDAyOTMgWiIgaWQ9IlNoYXBlIi8+CiAgPC9nPgogIDx0ZXh0IGZvbnQtZmFtaWx5PSJIZWx2ZXRpY2FOZXVlLUJvbGQsIEhlbHZldGljYSBOZXVlIiBmb250LXNpemU9IjI4IiBmb250LXdlaWdodD0iYm9sZCIgbGluZS1zcGFjaW5nPSIzOCIgZmlsbD0iIzAwMDAwMCIgZmlsbC1vcGFjaXR5PSIwLjU0Ij4KICAgICAgPHRzcGFuIHg9IjkxLjIzNCIgeT0iMTAyIj5OTzwvdHNwYW4+CiAgICAgIDx0c3BhbiB4PSI2Ni4zODQiIHk9IjE0MCI+SU1BR0U8L3RzcGFuPgogIDwvdGV4dD4KPC9nPgo8L3N2Zz4=';

    public resultLinkCmp: Coveo.ResultLink;

    /**
     * The options for the component
     * @componentOptions
     */
    static options: IClearBitLogoOptions = {
        field: ComponentOptions.buildFieldOption({ defaultValue: '@field', required: true }),
        size: ComponentOptions.buildNumberOption({ defaultValue: 65 })
    };

    constructor(
        public element: HTMLElement,
        public options: IClearBitLogoOptions,
        public bindings?: IResultsComponentBindings,
        public result?: IQueryResult,
        public ModalBox?: any
    ) {
        super(element, ClearBitLogo.ID, bindings);
        this.options = ComponentOptions.initComponentOptions(element, ClearBitLogo, options);

        this.renderImage();
    }

    /**
     * Gets the current FieldValue from the current {@link IQueryResult}.
     *
     * @returns {string} The current FieldValue or an empty string.
     */
    private getValue(): string {
        let value = Coveo.Utils.getFieldValue(this.result, this.options.field.toString());
        if (!_.isArray(value) && _.isObject(value)) {
            value = '';
        }
        return value;
    }
    private renderImage(): void {
        let companyName = this.getValue();
        // often we use urls, remove the protocol and the rest of the url (we just want the domain)
        companyName = (companyName || '').replace(/^\s*https?:\/*/g, '').replace(/[/#?].*/g, '');
        const imageUrl = companyName ? `https://logo.clearbit.com/${companyName}?s=${this.options.size}` : ClearBitLogo.NO_IMAGE_URL;
        let image = new Image();
        this.setImageSource(image, imageUrl, companyName);
        this.element.appendChild(image);
    }
    private setImageSource(image: HTMLImageElement, src: string, alt: string = 'Image Not Found') {
        image.onerror = () => this.setDefaultImage(image);
        image.alt = alt;
        image.title = alt;
        image.src = src;
        image.width = this.options.size;
    }
    private setDefaultImage(image: HTMLImageElement) {
        image.src = ClearBitLogo.NO_IMAGE_URL;
    }
}


