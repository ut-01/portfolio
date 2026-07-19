import React from "react";
import '../Assets/styles/Footer.css';
import { ReactComponent as Github } from '../Assets/images/github.svg';
import { ReactComponent as Twitter } from '../Assets/images/twitter.svg';
import { ReactComponent as Linkedin } from '../Assets/images/linkedin.svg';
import { ReactComponent as Mail } from '../Assets/images/mail.svg';
import { usePortfolio } from '../Context/PortfolioContext';

export default function Footer(props) {
  const { data } = usePortfolio();
  const contactData = data.contact;

  return (<footer className="glass02 p-1r m-sapt" id="contact">
		<div className="contact">
			<a className="contact-item" title="Github" target="_blank" rel="noreferrer" href={contactData.github}>
				<Github />
			</a>
			<a className="contact-item" title="Twitter" target="_blank" rel="noreferrer" href={contactData.twitter}>
				<Twitter />
			</a>
			<a className="contact-item" title="LinkedIn" target="_blank" rel="noreferrer" href={contactData.linkedin}>
				<Linkedin />
			</a>
			<a className="contact-item" title="email" target="_blank" rel="noreferrer" href={`mailto:${contactData.email}`}>
				<Mail />
			</a>
		</div>
    <hr className="max-w-half" />
    <div className="text-center m-halfr"><span>{contactData.copyright}</span></div>
	</footer>);
}