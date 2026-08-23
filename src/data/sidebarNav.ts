export type NavLeaf = {
  label: string;
  href: string;
};

export type NavNode = NavLeaf & {
  children?: NavLeaf[];
};

export type NavSection = {
  title: string;
  href: string;
  /** First section renders as the green underlined "brand" heading; all others are plain navy headings. */
  emphasized?: boolean;
  items?: NavNode[];
};

export const sidebarNav: NavSection[] = [
  {
    title: "AI Bridge Device Settings",
    href: "/device-installation",
    emphasized: true,
    items: [
      { label: "Device Installation", href: "/device-installation" },
      {
        label: "Discover Device on Network",
        href: "/discover-device-network",
        children: [
          { label: "Device Management Tool", href: "/device-management-tool" },
        ],
      },
      { label: "Initial Device Access Setup", href: "/initial-access-setup" },
      { label: "Analysis Video Settings", href: "/video-source-setup" },
      { label: "Remote Support Settings", href: "/remote-assistance" },
    ],
  },
  {
    title: "Application User Guide",
    href: "/application-guide",
    items: [
      { label: "Activate Application", href: "/application-activation" },
      {
        label: "Event Action Setup Guide",
        href: "/event-action-guide",
        children: [
          {
            label: "Alert Setup Example (Intrusion Detection)",
            href: "/detection-notification-example",
          },
        ],
      },
      {
        label: "Counter Setup Guide",
        href: "/counter-setting",
        children: [
          {
            label: "Counting Setup Example (People Counting in Zone)",
            href: "/counter-example",
          },
          {
            label: "Counter Event Action Setup Example",
            href: "/counter-action-rule-setting",
          },
          { label: "Periodic Report Usage Guide", href: "/report-setting" },
          {
            label: "Counter Statistics Report Format Guide",
            href: "/report-format",
          },
        ],
      },
      {
        label: "Recording Video and Snapshot",
        href: "/recording-video-and-snapshot",
      },
    ],
  },
  {
    title: "False Detection Reduction",
    href: "/false-detection-reduction",
    items: [
      { label: "Object Size Filter", href: "/object-size-filter" },
      { label: "Exclusion Area", href: "/exclusion-area" },
    ],
  },
  {
    title: "Arm / Disarm Setup Guide",
    href: "/disarm-setting",
  },
  {
    title: "AI App Preset Setup Guide",
    href: "/ai-app-preset-guide",
  },
  {
    title: "Generic Event Setup Guide",
    href: "/generic-event-guide",
  },
  {
    title: "Action Setting Guide",
    href: "/action-setting-guide",
    items: [
      {
        label: "Event Meta Token & Action Message Guide",
        href: "/meta-token-guide",
      },
      {
        label: "System",
        href: "/action-setting-system",
        children: [
          { label: "Device Audio Output", href: "/device-speaker-output" },
          { label: "Relay", href: "/relay" },
          { label: "Camera Speaker Output", href: "/audio-back-channel" },
          { label: "RS485 (RS232)", href: "/rs485-rs232" },
          { label: "RS485 Modbus (Satel)", href: "/rs485-modbus-satel" },
          { label: "TCP Modbus (WAVESHARE)", href: "/tcp-modbus-waveshare" },
          { label: "Virtual Alarm In", href: "/virtual-alarm-in" },
        ],
      },
      {
        label: "Network",
        href: "/network",
        children: [
          { label: "HTTP", href: "/http" },
          { label: "FTP Upload", href: "/ftp-upload" },
          { label: "AWS S3 Upload", href: "/aws-s3-upload" },
          { label: "TCP Communication", href: "/tcp-communication" },
          { label: "MQTT Publish", href: "/mqtt-publish" },
          { label: "Email Alert", href: "/email-alert" },
          { label: "AI Event Agent", href: "/ai-event-agent" },
          { label: "Video Clip / Snapshot", href: "/video-clip-snapshot" },
        ],
      },
    ],
  },
  {
    title: "VMS / Alarm Monitoring",
    href: "/vms-alarm-monitoring",
    items: [
      { label: "Avigilon ACC Integration Guide", href: "/avigilon-acc-guide" },
      {
        label: "Eagle Eye Networks Integration Guide",
        href: "/eagle-eye-guide",
      },
      { label: "exacqVision Integration Guide", href: "/exacqvision-guide" },
      { label: "Ganz Cortrol Integration Guide", href: "/ganz-cortrol-guide" },
      { label: "Genetec Integration Guide", href: "/genetec-guide" },
      { label: "Luxriot Evo Integration Guide", href: "/luxriot-evo-guide" },
      {
        label: "Milestone XProtect Integration Guide",
        href: "/milestone-xprotect-guide",
      },
      {
        label: "Network Optix Integration Guide",
        href: "/network-optix-guide",
      },
      { label: "Immix Integration Guide", href: "/immix-guide" },
      { label: "Geutebrück Integration Guide", href: "/geutebruck-guide" },
    ],
  },
  {
    title: "Cloud Subscribers Only",
    href: "/cloud-service-subscribers",
    items: [
      { label: "Telegram Messenger Alert", href: "/telegram-alarm" },
      { label: "LINE Messenger Alert", href: "/line-alarm" },
    ],
  },
  {
    title: "Schedule Setting Guide",
    href: "/schedule-setting",
  },
  {
    title: "Combined Rule Condition Setting Guide",
    href: "/combined-rule-condition-guide",
  },
  {
    title: "Cloud Application Integration Setting",
    href: "/cloud-application-integration-setting",
  },
  {
    title: "Event Metadata by Type",
    href: "/event-metadatas",
  },
  {
    title: "Event Type Key",
    href: "/event-type-key",
  },
];
