package DOM_XML;

import java.io.File;
import java.util.List;
import java.util.ArrayList;
 
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
 
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.w3c.dom.Node;


public class DOM_XML_Parser {
	public List<TeamMember> readXMLFile(File file) {
		List<TeamMember> members = new ArrayList<TeamMember>();
		try {
			DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
			
			// 获取team_members之外的
			Document doc = dBuilder.parse(file);
			String teamName = doc.getElementsByTagName("team_name").item(0).getTextContent();
			int teamID = Integer.parseInt(doc.getElementsByTagName("team_id").item(0).getTextContent());
			int peopleNumber = Integer.parseInt(doc.getElementsByTagName("people_number").item(0).getTextContent());
			
			// 设置team_members之内的
			NodeList memberList = doc.getElementsByTagName("team_member");
			for (int i = 0; i < memberList.getLength(); i++) {
				Node memberNode = memberList.item(i);
				if (memberNode.getNodeType() == Node.ELEMENT_NODE) {
					// 设置一些其他的
					Element memberElement = (Element) memberNode;
					
					TeamMember member = new TeamMember();
					member.setTeamName(teamName);
					member.setTeamID(teamID);
					member.setPeopleNumber(peopleNumber);
					
					// 设置里面的了
					// duty
					String duty = memberElement.getAttribute("duty");
					member.setTeamMemberDuty(duty);
					
					// name
					String name = memberElement.getElementsByTagName("name").item(0).getTextContent();
					member.setName(name);
					
					// sex
					String sex = ((Element)memberElement.getElementsByTagName("sex").item(0)).getAttribute("value");
					member.setSex(sex);
					
					// age
					int age = Integer.parseInt(memberElement.getElementsByTagName("age").item(0).getTextContent());
					member.setAge(age);
					
					// hobby
					NodeList hobbyList = memberElement.getElementsByTagName("hobby");
					String hobby = "";
					for (int j = 0; j < hobbyList.getLength(); j++) {
						hobby = hobby + hobbyList.item(j).getTextContent() + "/";
					}
					hobby = hobby.substring(0, hobby.length() - 1);
					member.setHobby(hobby);
					
					// job
					String job = memberElement.getElementsByTagName("job").item(0).getTextContent();
					member.setJob(job);
					
					// company
					String company = memberElement.getElementsByTagName("company").item(0).getTextContent();
					member.setCompany(company);
					
					// email
					NodeList emailList = memberElement.getElementsByTagName("email");
					String email = "";
					for (int j = 0; j < emailList.getLength(); j++) {
						email = email + emailList.item(j).getTextContent() + "/";
					}
					email = email.substring(0, email.length() - 1);
					member.setEmail(email);
					
					// tel
					NodeList telList = memberElement.getElementsByTagName("tel");
					String tel = "";
					for (int j = 0; j < telList.getLength(); j++) {
						tel = tel + telList.item(j).getTextContent() + "/";
					}
					tel = tel.substring(0, tel.length() - 1);
					member.setTel(tel);

					members.add(member);
				}
 
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return members;
	}
	
	public List<OscarMovie> readXMLFile1(File file) {
		List<OscarMovie> movies = new ArrayList<OscarMovie>();
		try {
			DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
			
			Document doc = dBuilder.parse(file);
			
			NodeList movieList = doc.getElementsByTagName("movie");
			for (int i = 0; i < movieList.getLength(); i++) {
				Node memberNode = movieList.item(i);
				if (memberNode.getNodeType() == Node.ELEMENT_NODE) {
					// 设置一些其他的
					Element memberElement = (Element) memberNode;
					
					OscarMovie movie = new OscarMovie();
					
					// 设置里面的了
					// year
					int year = Integer.parseInt(memberElement.getAttribute("year"));
					movie.setYear(year);
					
					// name
					String name = memberElement.getElementsByTagName("name").item(0).getTextContent();
					movie.setName(name);
					
					// rating
					double rating = Double.parseDouble(memberElement.getElementsByTagName("rating").item(0).getTextContent());
					movie.setRating(rating);
					
					// star
					NodeList starList = memberElement.getElementsByTagName("star");
					String star = "";
					for (int j = 0; j < starList.getLength(); j++) {
						star = star + starList.item(j).getTextContent() + "/";
					}
					star = star.substring(0, star.length() - 1);
					movie.setStar(star);
					
					// opening
					String opening = memberElement.getElementsByTagName("Opening_Weekend_USA").item(0).getTextContent();
					movie.setOpening(opening);
					
					movies.add(movie);
				}
 
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return movies;
	}
	
	public void reviseXMLFile(File file, String memberName, String labelName, String content, String outputFilePath) throws Exception{
		DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
		
		Document doc = dBuilder.parse(file);
		
		NodeList memberList = doc.getElementsByTagName("team_member");
		boolean isAdd = true;
		boolean isRevised = false;
		for (int i = 0; i < memberList.getLength(); i++) {
			Node memberNode = memberList.item(i);
			if (memberNode.getNodeType() == Node.ELEMENT_NODE) {
				Element memberElement = (Element) memberNode;
				
				// 如果名字相等
				String name = memberElement.getElementsByTagName("name").item(0).getTextContent();
				// System.out.println(name);
				
				if(memberName.equals(name)) {
					switch(labelName) {
						case "duty":{
							memberElement.setAttribute("duty", content); 
							isRevised = true;
							break;
						}
						
						case "sex":{
							((Element)memberElement.getElementsByTagName("sex").item(0)).setAttribute("value", content);
							isRevised = true;
							break;
						}
						
						case "age":{
							memberElement.getElementsByTagName("age").item(0).setTextContent(content);
							isRevised = true;
							break;
						}
						
						case "hobby":{
							NodeList hobbyList = memberElement.getElementsByTagName("hobby");
							for (int j = 0; j < hobbyList.getLength(); j++) {
								if(content.equals(hobbyList.item(j).getTextContent())) {
									isAdd = false;
								}
							}
							if(isAdd) {
								Node newHobbyNode = doc.createElement("hobby");
								newHobbyNode.appendChild(doc.createTextNode(content));
								memberElement.getElementsByTagName("hobbies").item(0).appendChild(newHobbyNode);
								isRevised = true;
							}else {
								System.out.println(labelName + " " + content + " already exists!");
							}
							break;
						}
						
						
						case "job":{
							memberElement.getElementsByTagName("job").item(0).setTextContent(content);
							isRevised = true;
							break;
						}
						
						case "company":{
							memberElement.getElementsByTagName("company").item(0).setTextContent(content);
							isRevised = true;
							break;
						}
						
						case "email":{
							NodeList emailList = memberElement.getElementsByTagName("email");
							for (int j = 0; j < emailList.getLength(); j++) {
								if(content.equals(emailList.item(j).getTextContent())) {
									isAdd = false;
								}
							}
							if(isAdd) {
								Node newEmailNode = doc.createElement("email");
								newEmailNode.appendChild(doc.createTextNode(content));
								memberElement.getElementsByTagName("contact").item(0).appendChild(newEmailNode);
								isRevised = true;
							}else {
								System.out.println(labelName + " " + content + " already exists!");
							}
							break;
						}
						
						case "tel":{
							NodeList telList = memberElement.getElementsByTagName("tel");
							for (int j = 0; j < telList.getLength(); j++) {
								if(content.equals(telList.item(j).getTextContent())) {
									isAdd = false;
								}
							}
							if(isAdd) {
								Node newTelNode = doc.createElement("email");
								newTelNode.appendChild(doc.createTextNode(content));
								memberElement.getElementsByTagName("contact").item(0).appendChild(newTelNode);
								isRevised = true;
							}else {
								System.out.println(labelName + " " + content + " already exists!");
							}
							break;
						}
						
						default:{
							throw new Exception("Label Error!");
						}
					}
				}
			}
		}
		
		if(isAdd) {
			TransformerFactory transformerFactory = TransformerFactory.newInstance();
			Transformer transformer = transformerFactory.newTransformer();
			DOMSource source = new DOMSource(doc);
			StreamResult result = new StreamResult(new File(outputFilePath));
	 	 
			transformer.transform(source, result);
		}
		
		if(!isRevised) {
			throw new Exception(labelName + " " + content + " already exists!");
		}
	}
	
	public static void main(String[] args) {
		String filePath = "src/DOM_XML/team.xml";
		File file = new File(filePath);
		DOM_XML_Parser p = new DOM_XML_Parser();
		// p.reviseXMLFile(file, "李泓烨", "hobby", "篮球", filePath);
	}
	
}
