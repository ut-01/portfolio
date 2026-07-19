class Command{
  
  
  static keywords = {
    help: new Command("help", `Help is on the way...\nAll commands are case-insenstive.\n\nut help: Show list of all the commands\nut blogs: Go to My Blogs\nut extras: Some side stuff I do...\nut projects: Show off my projects\nut email: Contact using Email\nut twitter: Twitter Profile\nut github: Checkout my Github profile\nut linkedin: My Linkedin profile\n`, "cyan", "Show list of all the commands", null),
    blogs: new Command("blogs", "Taking you to my blogs...", "custom-color1", "Go to My Blogs", ["redirect", "/blogs"]),
    projects: new Command("projects", "Taking you to my projects...", "lime", "Show off my projects", ["redirect", "/projects"]),
    email: new Command("email", "Here you go...", "orchid", "Contact using Email", ["open", "mailto:utkarshdhiman48@gmail.com"]),
    twitter: new Command("twitter", "To the twitter and beyond...", "tw-color", "Twitter Profile", ["open", "https://twitter.com/utkarshdhiman48"]),
    github: new Command("github", "Here you go...", "fb-color", "Checkout my Github profile", ["open", "https://github.com/utkarshdhiman48"]),
    linkedin: new Command("linkedin", "To the linkedin and beyond...", "ln-color", "My Linkedin profile", ["open", "https://www.linkedin.com/in/utkarsh-dhiman-b626b5149"]),
    exit: new Command("exit", "Close terminal", "orchid", "Terminal is closing", ["exit"])
  };
  
  constructor(command, response, colorClass, description, action){
    this.command = command;
    this.response = response;
    this.colorClass = colorClass;
    this.description = description;
    this.action = action;
  }

}


export function getCommandObject(command){
  return Command.keywords[command] || new Command("invalidCommand", `Unknown command please type 'ut help' to get a list of all commands`, "cyan", "", null);
}