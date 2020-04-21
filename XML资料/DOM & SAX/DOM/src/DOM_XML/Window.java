package DOM_XML;

import java.io.File;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;

import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import java.awt.Font;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.awt.EventQueue;

public class Window {
	private DOM_XML_Parser domXMLParser;
	private File teamFile;
	private File movieFile;
	private String outputFilePath;
	
	private JFrame domFrame;
	private JButton queryTeamButton;
	private JButton queryOscarButton;
	
	private JFrame teamFrame;
	private JLabel teamInputLabel;
	private JLabel teamOutputLabel;
	private JTextField teamTextField;
	private JScrollPane teamScrollPane;
	private JTextArea teamTextArea;
	private JButton showTeamButton;
	private JButton reviseTeamButton;
	
	private JFrame oscarFrame;
	private JLabel oscarSortLabel;
	private JLabel oscarOutputLabel;
	private JButton oscarSortByRatingButton;
	private JButton oscarSortByOpeningButton;
	private JButton oscarSortByYearButton;
	private JScrollPane oscarScrollPane;
	private JTextArea oscarTextArea;
	private boolean yearAscending;
	private boolean ratingAscending;
	private boolean openingAscending;
	
		
	public Window()
    {
        domFrame = new JFrame();
		domFrame.setFont(new Font("Dialog", Font.PLAIN, 22));
		domFrame.setTitle("DOM Window");
		domFrame.setBounds(100, 100, 990, 698);
		domFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		domFrame.getContentPane().setLayout(null);
        
		queryTeamButton = new JButton("Query Team");
		queryTeamButton.setFont(new Font("宋体", Font.PLAIN, 22));
		queryTeamButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				queryTeam();
			}
		});
		queryTeamButton.setBounds(200, 200, 200, 200);
		domFrame.getContentPane().add(queryTeamButton);
		
		queryOscarButton = new JButton("Query Oscar");
		queryOscarButton.setFont(new Font("宋体", Font.PLAIN, 22));
		queryOscarButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				queryOscar();
			}
		});
		queryOscarButton.setBounds(600, 200, 200, 200);
		domFrame.getContentPane().add(queryOscarButton);
		
		domXMLParser = new DOM_XML_Parser();
		teamFile = new File("src/DOM_XML/team.xml");
		movieFile = new File("src/DOM_XML/Oscars_Best_Motion_Pics-v1.7.xml");
		outputFilePath = "src/DOM_XML/team.xml";
		
		yearAscending = false;
		ratingAscending = false;
		openingAscending = false;
    }
	
	private void queryTeam() {
		teamFrame = new JFrame();
		teamFrame.setFont(new Font("Dialog", Font.PLAIN, 22));
		teamFrame.setTitle("Team Window");
		teamFrame.setBounds(100, 100, 990, 698);
		teamFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
		teamFrame.getContentPane().setLayout(null);
		
		teamInputLabel = new JLabel("Input:");
		teamInputLabel.setFont(new Font("宋体", Font.PLAIN, 20));
		teamInputLabel.setBounds(43, 48, 81, 21);
		teamFrame.getContentPane().add(teamInputLabel);
		
		teamOutputLabel = new JLabel("Output:");
		teamOutputLabel.setFont(new Font("宋体", Font.PLAIN, 20));
		teamOutputLabel.setBounds(43, 117, 81, 21);
		teamFrame.getContentPane().add(teamOutputLabel);
		
		teamTextField = new JTextField();
		teamTextField.setFont(new Font("Consolas", Font.PLAIN, 22));
		teamTextField.setBounds(135, 48, 621, 54);
		teamFrame.getContentPane().add(teamTextField);
		
		teamScrollPane = new JScrollPane();
		teamScrollPane.setBounds(135, 117, 621, 480);
		teamFrame.getContentPane().add(teamScrollPane);
		
		teamTextArea = new JTextArea();
		teamTextArea.setFont(new Font("Monospaced", Font.PLAIN, 22));
		teamScrollPane.setViewportView(teamTextArea);
		
		showTeamButton = new JButton("Show Info");
		showTeamButton.setFont(new Font("宋体", Font.PLAIN, 14));
		showTeamButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				showTeamInfo();
			}
		});
		showTeamButton.setBounds(800, 48, 100, 54);
		teamFrame.getContentPane().add(showTeamButton);
		
		reviseTeamButton = new JButton("Revise Info");
		reviseTeamButton.setFont(new Font("宋体", Font.PLAIN, 14));
		reviseTeamButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				reviseTeamInfo();
			}
		});
		reviseTeamButton.setBounds(800, 117, 100, 54);
		teamFrame.getContentPane().add(reviseTeamButton);
		
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					teamFrame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}
	
	private void queryOscar() {
		oscarFrame = new JFrame();
		oscarFrame.setFont(new Font("Dialog", Font.PLAIN, 22));
		oscarFrame.setTitle("Oscar Window");
		oscarFrame.setBounds(100, 100, 990, 698);
		oscarFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
		oscarFrame.getContentPane().setLayout(null);
		
		oscarSortLabel = new JLabel("Sort By:");
		oscarSortLabel.setFont(new Font("宋体", Font.PLAIN, 20));
		oscarSortLabel.setBounds(43, 48, 81, 21);
		oscarFrame.getContentPane().add(oscarSortLabel);
		
		oscarOutputLabel = new JLabel("Output:");
		oscarOutputLabel.setFont(new Font("宋体", Font.PLAIN, 20));
		oscarOutputLabel.setBounds(43, 117, 81, 21);
		oscarFrame.getContentPane().add(oscarOutputLabel);
		
		oscarSortByRatingButton = new JButton("Rating");
		oscarSortByRatingButton.setFont(new Font("宋体", Font.PLAIN, 14));
		oscarSortByRatingButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				showOscarSortByRating(ratingAscending);
				ratingAscending = !ratingAscending;
			}
		});
		oscarSortByRatingButton.setBounds(135, 48, 180, 54);
		oscarFrame.getContentPane().add(oscarSortByRatingButton);
		
		oscarSortByOpeningButton = new JButton("Opening");
		oscarSortByOpeningButton.setFont(new Font("宋体", Font.PLAIN, 14));
		oscarSortByOpeningButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				showOscarSortByOpening(openingAscending);
				openingAscending = !openingAscending;
			}
		});
		oscarSortByOpeningButton.setBounds(335, 48, 180, 54);
		oscarFrame.getContentPane().add(oscarSortByOpeningButton);
		
		oscarSortByYearButton = new JButton("Year");
		oscarSortByYearButton.setFont(new Font("宋体", Font.PLAIN, 14));
		oscarSortByYearButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				showOscarSortByYear(yearAscending);
				yearAscending = !yearAscending;
			}
		});
		oscarSortByYearButton.setBounds(535, 48, 180, 54);
		oscarFrame.getContentPane().add(oscarSortByYearButton);
		
		oscarScrollPane = new JScrollPane();
		oscarScrollPane.setBounds(135, 117, 621, 480);
		oscarFrame.getContentPane().add(oscarScrollPane);
		
		oscarTextArea = new JTextArea();
		oscarTextArea.setFont(new Font("Monospaced", Font.PLAIN, 22));
		oscarScrollPane.setViewportView(oscarTextArea);
		
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					oscarFrame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}
	
	private void showTeamInfo() {
		List<TeamMember> members = domXMLParser.readXMLFile(teamFile);
		teamTextArea.setText(members.get(0).getTeamName() + "(" + members.get(0).getTeamID() + ")" + " Info Listed: \r\n\r\n" );
		for(TeamMember member : members) {
			teamTextArea.setText(teamTextArea.getText() + member + "\r\n");
		}
		teamTextArea.setText(teamTextArea.getText() + members.size() + " people involved. \r\n");
	}
	
	
	private void reviseTeamInfo() {
		teamTextArea.setText("");
		String conditions = teamTextField.getText().trim();
		if(conditions == null || conditions.equals("")) {
			teamTextArea.setText("Please enter condition!");
			return;
		}
		String [] pairs = conditions.split(";");
		String [] parameters = new String[3];
		try {
			for(int i = 0; i < pairs.length; i++) {
				String[] pair = pairs[i].split(":");
				if(pair[0].trim().equals("member_name")) {
					parameters[0] = pair[1].trim();
				}else if(pair[0].equals("label_name")) {
					parameters[1] = pair[1].trim();
				}else if(pair[0].equals("content")) {
					parameters[2] = pair[1].trim();
				}else {
					throw new Exception("Condition error! Please revise your condition! ");
				}
			}
			domXMLParser.reviseXMLFile(teamFile, parameters[0], parameters[1], parameters[2], outputFilePath);
		}catch (Exception e) {
			teamTextArea.setText(e.getMessage());
			return;
		}
		teamTextArea.setText("Revise Complete!\nHit Show Info Button to show the team information!");
	}
	
	private void showOscarSortByRating(boolean ascending) {
		List<OscarMovie> movies = domXMLParser.readXMLFile1(movieFile);
		
		Map<OscarMovie, Double> sortedByRating = new ConcurrentHashMap<>();
		for(OscarMovie movie : movies) {
			sortedByRating.put(movie, movie.getRating());
		}
		
		List<Double> ratingList = new ArrayList<>();
		ratingList.addAll(sortedByRating.values());
		Collections.sort(ratingList);
		if(!ascending) {
			Collections.reverse(ratingList);
		}
		
		List<OscarMovie> sortedOscarMovies = new ArrayList<>();
		for(double d : ratingList)
			for(OscarMovie k : sortedByRating.keySet())
				if(sortedByRating.get(k) == d) {
					sortedByRating.remove(k, d);
					sortedOscarMovies.add(k);
				}
		
		oscarTextArea.setText("Movie Info Listed(Sorted By Rating " + ascending + "):\r\n\r\n");
		for(OscarMovie movie : sortedOscarMovies) {
			oscarTextArea.setText(oscarTextArea.getText() + movie + "\r\n");
		}
		oscarTextArea.setText(oscarTextArea.getText() + movies.size() + " movies involved. \r\n");
	}
	
	private void showOscarSortByOpening(boolean ascending) {
		List<OscarMovie> movies = domXMLParser.readXMLFile1(movieFile);
		
		Map<OscarMovie, Long> sortedByOpening = new ConcurrentHashMap<>();
		for(OscarMovie movie : movies) {
			sortedByOpening.put(movie, Long.parseLong(movie.getOpening().replace(",","")));
		}
		
		List<Long> openingList = new ArrayList<>();
		openingList.addAll(sortedByOpening.values());
		Collections.sort(openingList);
		if(!ascending) {
			Collections.reverse(openingList);
		}
		
		List<OscarMovie> sortedOscarMovies = new ArrayList<>();
		for(long l : openingList)
			for(OscarMovie k : sortedByOpening.keySet())
				if(sortedByOpening.get(k) == l) {
					sortedByOpening.remove(k, l);
					sortedOscarMovies.add(k);
				}
		
		oscarTextArea.setText("Movie Info Listed(Sorted By Opening " + ascending + "):\r\n\r\n");
		for(OscarMovie movie : sortedOscarMovies) {
			oscarTextArea.setText(oscarTextArea.getText() + movie + "\r\n");
		}
		oscarTextArea.setText(oscarTextArea.getText() + movies.size() + " movies involved. \r\n");
	}
	
	private void showOscarSortByYear(boolean ascending) {
		List<OscarMovie> movies = domXMLParser.readXMLFile1(movieFile);
		
		Map<Integer, OscarMovie> sortedByYear = new HashMap<>();
		for(OscarMovie movie : movies) {
			sortedByYear.put(movie.getYear(), movie);
		}
		
		List<Integer> yearList = new ArrayList<>();
		yearList.addAll(sortedByYear.keySet());
		Collections.sort(yearList);
		if(!ascending) {
			Collections.reverse(yearList);
		}
		
		List<OscarMovie> sortedOscarMovies = new ArrayList<>();
		for(int year : yearList)
			sortedOscarMovies.add(sortedByYear.get(year));
		
		oscarTextArea.setText("Movie Info Listed(Sorted By Year " + ascending + "):\r\n\r\n");
		for(OscarMovie movie : sortedOscarMovies) {
			oscarTextArea.setText(oscarTextArea.getText() + movie + "\r\n");
		}
		oscarTextArea.setText(oscarTextArea.getText() + movies.size() + " movies involved. \r\n");
	}
	
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					Window window = new Window();
					window.domFrame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}
}
