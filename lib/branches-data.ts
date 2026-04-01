export interface Branch {
  id: string
  name: string
  shortName: string
  logo: string
  description: string
  social: {
    website?: string
    twitter?: string
    linkedin?: string
    instagram?: string
    facebook?: string
    youtube?: string
  }
}

export const branches: Branch[] = [
  {
    id: "cs",
    name: "Computer Society",
    shortName: "CS",
    logo: "/logos/CS.png",
    description: "The world's leading organization for computer professionals.",
    social: {
      facebook: "https://facebook.com/ieeecomputersociety",
      instagram: "https://instagram.com/ieeecomputersociety",
      youtube: "https://youtube.com/ieeecomputersociety",
    },
  },
  {
    id: "ras",
    name: "Robotics and Automation Society",
    shortName: "RAS",
    logo: "/logos/RAS.png",
    description: "Advancing innovation in robotics and automation technologies.",
    social: {
      facebook: "https://facebook.com/ieee.ras",
      instagram: "https://instagram.com/ieee_ras",
      youtube: "https://youtube.com/ieeeRAS",
    },
  },
  {
    id: "pes",
    name: "Power & Energy Society",
    shortName: "PES",
    logo: "/logos/PES.png",
    description: "Leading the way in power and energy engineering.",
    social: {
      facebook: "https://facebook.com/ieeepes",
      instagram: "https://instagram.com/ieee_pes",
      youtube: "https://youtube.com/ieeepes",
    },
  },
  {
    id: "embs",
    name: "Engineering in Medicine and Biology Society",
    shortName: "EMBS",
    logo: "/logos/EMBSNEW.png",
    description: "Bridging engineering and medicine to improve healthcare.",
    social: {
      facebook: "https://facebook.com/ieeeembs",
      instagram: "https://instagram.com/ieee_embs",
      youtube: "https://youtube.com/ieeeembs",
    },
  },
  {
    id: "comsoc",
    name: "Communications Society",
    shortName: "ComSoc",
    logo: "/logos/ComSoc.png",
    description: "Fostering advances in communications and networking.",
    social: {
      facebook: "https://facebook.com/ieeecomsoc",
      instagram: "https://instagram.com/ieee_comsoc",
      youtube: "https://youtube.com/ieeecomsoc",
    },
  },
  {
    id: "cis",
    name: "Computational Intelligence Society",
    shortName: "CIS",
    logo: "/logos/CIS.png",
    description: "Advancing computational intelligence and neural networks.",
    social: {
      facebook: "https://facebook.com/ieeecis",
      instagram: "https://instagram.com/ieee_cis",
      youtube: "https://youtube.com/ieeecis",
    },
  },
  {
    id: "sps",
    name: "Signal Processing Society",
    shortName: "SPS",
    logo: "/logos/SPS.png",
    description: "Advancing signal processing theory and applications.",
    social: {
      facebook: "https://facebook.com/ieeesps",
      instagram: "https://instagram.com/ieee_sps",
      youtube: "https://youtube.com/ieeesps",
    },
  },
  {
    id: "grss",
    name: "Geoscience and Remote Sensing Society",
    shortName: "GRSS",
    logo: "/logos/GRSS.png",
    description: "Advancing geoscience and remote sensing technology.",
    social: {
      facebook: "https://facebook.com/ieeegrss",
      instagram: "https://instagram.com/ieee_grss",
      youtube: "https://youtube.com/ieeegrss",
    },
  },
  {
    id: "ias",
    name: "Industry Applications Society",
    shortName: "IAS",
    logo: "/logos/IAS.png",
    description: "Advancing electrical systems in industry.",
    social: {
      facebook: "https://facebook.com/ieeeias",
      instagram: "https://instagram.com/ieee_ias",
      youtube: "https://youtube.com/ieeeias",
    },
  },
  {
    id: "ies",
    name: "Industrial Electronics Society",
    shortName: "IES",
    logo: "/logos/IES.png",
    description: "Advancing industrial electronics and automation.",
    social: {
      facebook: "https://facebook.com/ieeeies",
      instagram: "https://instagram.com/ieee_ies",
      youtube: "https://youtube.com/ieeeies",
    },
  },
  {
    id: "itss",
    name: "Intelligent Transportation Systems Society",
    shortName: "ITSS",
    logo: "/logos/ITSS.png",
    description: "Advancing intelligent transportation research.",
    social: {
      facebook: "https://facebook.com/ieeeitss",
      instagram: "https://instagram.com/ieee_itss",
      youtube: "https://youtube.com/ieeeitss",
    },
  },
  {
    id: "pels",
    name: "Power Electronics Society",
    shortName: "PELS",
    logo: "/logos/PELS.png",
    description: "Promoting power electronics technology.",
    social: {
      facebook: "https://facebook.com/ieeepels",
      instagram: "https://instagram.com/ieee_pels",
      youtube: "https://youtube.com/ieeepels",
    },
  },
  {
    id: "npss",
    name: "Nuclear and Plasma Sciences Society",
    shortName: "NPSS",
    logo: "/logos/NPSS.png",
    description: "Advancing nuclear and plasma sciences.",
    social: {
      facebook: "https://facebook.com/ieeenpss",
      instagram: "https://instagram.com/ieee_npss",
      youtube: "https://youtube.com/ieeenpss",
    },
  },
  {
    id: "procom",
    name: "Professional Communication Society",
    shortName: "ProCom",
    logo: "/logos/ProCom.png",
    description: "Advancing professional communication in engineering.",
    social: {
      facebook: "https://facebook.com/ieeeprocom",
      instagram: "https://instagram.com/ieee_procom",
      youtube: "https://youtube.com/ieeeprocom",
    },
  },
  {
    id: "tems",
    name: "Technology and Engineering Management Society",
    shortName: "TEMS",
    logo: "/logos/TEMS.png",
    description: "Bridging technology and management.",
    social: {
      facebook: "https://facebook.com/ieeetems",
      instagram: "https://instagram.com/ieee_tems",
      youtube: "https://youtube.com/ieeetems",
    },
  },
  {
    id: "wie",
    name: "Women in Engineering",
    shortName: "WIE",
    logo: "/logos/WIE.png",
    description: "Inspiring women in engineering and technology.",
    social: {
      facebook: "https://facebook.com/ieeewie",
      instagram: "https://instagram.com/ieee_wie",
      youtube: "https://youtube.com/ieeewie",
    },
  },
]
