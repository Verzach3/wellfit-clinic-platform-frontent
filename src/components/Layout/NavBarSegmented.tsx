import {useEffect, useState} from "react";
import {SegmentedControl, Text} from "@mantine/core";
import {
  IconShoppingCart,
  IconLicense,
  IconMessage2,
  IconBellRinging,
  IconMessages,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconUsers,
  IconFileAnalytics,
  IconDatabaseImport,
  IconReceiptRefund,
  IconLogout,
  IconSwitchHorizontal, IconCheckbox,
} from "@tabler/icons-react";
import classes from "./NavBarSegmented.module.css";
import {useNavigate} from "react-router-dom";

const tabs = {
  account: [
    {link: "/", label: "Inicio", icon: IconBellRinging},
    {link: "/surveys", label: "Encuestas", icon: IconCheckbox},
    {link: "", label: "Security", icon: IconFingerprint},
    {link: "", label: "SSH Keys", icon: IconKey},
    {link: "", label: "Databases", icon: IconDatabaseImport},
    {link: "", label: "Authentication", icon: Icon2fa},
    {link: "", label: "Other Settings", icon: IconSettings},
  ],
  general: [
    {link: "", label: "Orders", icon: IconShoppingCart},
    {link: "", label: "Receipts", icon: IconLicense},
    {link: "", label: "Reviews", icon: IconMessage2},
    {link: "", label: "Messages", icon: IconMessages},
    {link: "", label: "Customers", icon: IconUsers},
    {link: "", label: "Refunds", icon: IconReceiptRefund},
    {link: "", label: "Files", icon: IconFileAnalytics},
  ],
};

export function NavbarSegmented() {
  const [section, setSection] = useState<"account" | "general">("account");
  const [active, setActive] = useState("Inicio");
  const navigate = useNavigate();
  const [currentEmail, setCurrentEmail] = useState<string>("");

  useEffect(() => {
    window.supabase.auth.getSession().then(({ data: { session }}) => {
      if (session) {
        setCurrentEmail(session.user.email?? "email not found");
      }
    })
  }, []);

  const links = tabs[section].map((item) => (
    <a
      key={item.label}
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        navigate(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5}/>
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div>
        <Text fw={500} size="sm" className={classes.title} c="dimmed" mb="xs">
          {currentEmail}
        </Text>

        <SegmentedControl
          value={section}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(value: any) => setSection(value)}
          transitionTimingFunction="ease"
          fullWidth
          data={[
            {label: "Account", value: "account"},
            {label: "System", value: "general"},
          ]}
        />
      </div>

      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5}/>
          <span>Change account</span>
        </a>

        <a
          className={classes.link}
          onClick={(event) => {
            event.preventDefault();
            window.supabase.auth.signOut();
          }}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5}/>
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
