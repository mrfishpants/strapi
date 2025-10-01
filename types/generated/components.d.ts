import type { Schema, Struct } from '@strapi/strapi';

export interface PageSectionsHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_page_sections_hero_sections';
  info: {
    description: 'Reusable hero section with title, body, buttons, and optional images';
    displayName: 'Hero Section';
  };
  attributes: {
    body: Schema.Attribute.Text & Schema.Attribute.Required;
    buttons: Schema.Attribute.Component<'ui.icon-button', true>;
    gallery: Schema.Attribute.Media<'images', true>;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageSectionsSectionHeader extends Struct.ComponentSchema {
  collectionName: 'components_page_sections_section_headers';
  info: {
    description: 'Reusable section with title and subtitle';
    displayName: 'Section Header';
  };
  attributes: {
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface PageSectionsStorySection extends Struct.ComponentSchema {
  collectionName: 'components_page_sections_story_sections';
  info: {
    description: 'Our story section with title, body, image and stats';
    displayName: 'Story Section';
  };
  attributes: {
    body: Schema.Attribute.RichText & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    stats: Schema.Attribute.Component<'ui.stat-card', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProcessProcessStep extends Struct.ComponentSchema {
  collectionName: 'components_process_process_steps';
  info: {
    description: 'Individual step in a process workflow';
    displayName: 'Process Step';
    icon: 'arrow-right';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
        minLength: 10;
      }>;
    details: Schema.Attribute.JSON & Schema.Attribute.Required;
    icon: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'CheckCircle'>;
    sortOrder: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
        minLength: 1;
      }>;
  };
}

export interface SeoDefaults extends Struct.ComponentSchema {
  collectionName: 'components_seo_defaults';
  info: {
    description: 'Default SEO settings for the website';
    displayName: 'SEO Defaults';
  };
  attributes: {
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    siteName: Schema.Attribute.String & Schema.Attribute.Required;
    twitterHandle: Schema.Attribute.String;
  };
}

export interface SharedAddress extends Struct.ComponentSchema {
  collectionName: 'components_shared_addresses';
  info: {
    displayName: 'Address';
    icon: 'map-marker-alt';
  };
  attributes: {
    country: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Australia'>;
    postcode: Schema.Attribute.String & Schema.Attribute.Required;
    state: Schema.Attribute.Enumeration<
      ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'NSW'>;
    street: Schema.Attribute.String & Schema.Attribute.Required;
    suburb: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSocialMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_media';
  info: {
    displayName: 'Social Media';
    icon: 'share-alt';
  };
  attributes: {
    facebook: Schema.Attribute.String;
    instagram: Schema.Attribute.String;
    linkedin: Schema.Attribute.String;
    twitter: Schema.Attribute.String;
    youtube: Schema.Attribute.String;
  };
}

export interface UiIconButton extends Struct.ComponentSchema {
  collectionName: 'components_ui_icon_buttons';
  info: {
    description: 'Button with icon and text';
    displayName: 'Icon Button';
  };
  attributes: {
    backgroundColor: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'secondary'>;
    icon: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Shield'>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UiStatCard extends Struct.ComponentSchema {
  collectionName: 'components_ui_stat_cards';
  info: {
    description: 'Statistics card with number, label and icon';
    displayName: 'Stat Card';
  };
  attributes: {
    icon: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Users'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    number: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface WebsiteAnnouncementBanner extends Struct.ComponentSchema {
  collectionName: 'components_website_announcement_banners';
  info: {
    description: 'Site-wide announcement banner';
    displayName: 'Announcement Banner';
  };
  attributes: {
    dismissible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    enabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    expiryDate: Schema.Attribute.DateTime;
    link: Schema.Attribute.String;
    linkText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Learn more'>;
    message: Schema.Attribute.Text & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<
      ['info', 'warning', 'success', 'error']
    > &
      Schema.Attribute.DefaultTo<'info'>;
  };
}

export interface WebsiteCtaButton extends Struct.ComponentSchema {
  collectionName: 'components_website_cta_buttons';
  info: {
    description: 'Call to action button configuration';
    displayName: 'CTA Button';
  };
  attributes: {
    icon: Schema.Attribute.Enumeration<
      ['none', 'arrow-right', 'phone', 'email', 'download']
    > &
      Schema.Attribute.DefaultTo<'none'>;
    link: Schema.Attribute.String & Schema.Attribute.Required;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    style: Schema.Attribute.Enumeration<['primary', 'secondary', 'outline']> &
      Schema.Attribute.DefaultTo<'primary'>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface WebsiteFooterLink extends Struct.ComponentSchema {
  collectionName: 'components_website_footer_links';
  info: {
    description: 'Links for website footer sections';
    displayName: 'Footer Link';
  };
  attributes: {
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    section: Schema.Attribute.Enumeration<
      ['Services', 'Company', 'Resources', 'Legal']
    > &
      Schema.Attribute.DefaultTo<'Services'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface WebsiteHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_website_hero_sections';
  info: {
    description: 'Main hero section content';
    displayName: 'Hero Section';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    primaryButtonLink: Schema.Attribute.String;
    primaryButtonText: Schema.Attribute.String;
    secondaryButtonLink: Schema.Attribute.String;
    secondaryButtonText: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'page-sections.hero-section': PageSectionsHeroSection;
      'page-sections.section-header': PageSectionsSectionHeader;
      'page-sections.story-section': PageSectionsStorySection;
      'process.process-step': ProcessProcessStep;
      'seo.defaults': SeoDefaults;
      'shared.address': SharedAddress;
      'shared.social-media': SharedSocialMedia;
      'ui.icon-button': UiIconButton;
      'ui.stat-card': UiStatCard;
      'website.announcement-banner': WebsiteAnnouncementBanner;
      'website.cta-button': WebsiteCtaButton;
      'website.footer-link': WebsiteFooterLink;
      'website.hero-section': WebsiteHeroSection;
    }
  }
}
