import java.awt.EventQueue;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.swing.JFrame;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.xml.sax.SAXException;
import org.xml.sax.XMLReader;
import javax.swing.JLabel;
import javax.swing.JTextField;
import javax.swing.JScrollPane;
import javax.swing.JPanel;
import javax.swing.JButton;
import javax.swing.JTextArea;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import java.awt.Font;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;

public class window {
	public static final String XML_URL = "All_Movies.xml";
	
	private MyHandler handler;

	private JFrame frmSaxQueryExample;
	private JTextField textField;
	private JTextArea textArea;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					window window = new window();
					window.frmSaxQueryExample.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the application.
	 */
	public window() {		
		SAXParserFactory factory = SAXParserFactory.newInstance();
        SAXParser sp = null;
		try {
			sp = factory.newSAXParser();
		} catch (ParserConfigurationException e) {
			System.out.println(e);
		} catch (SAXException e) {
			System.out.println(e);
		}
        XMLReader reader = null;
		try {
			reader = sp.getXMLReader();
		} catch (SAXException e) {
			System.out.println(e);
		}
		handler = new MyHandler();
        reader.setContentHandler(handler);
        try {
			reader.parse(XML_URL);
			initialize();
		} catch (IOException | SAXException e) {
			System.out.println(e);
		}
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		frmSaxQueryExample = new JFrame();
		frmSaxQueryExample.setFont(new Font("Dialog", Font.PLAIN, 22));
		frmSaxQueryExample.setTitle("SAX Query Example");
		frmSaxQueryExample.setBounds(100, 100, 990, 698);
		frmSaxQueryExample.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frmSaxQueryExample.getContentPane().setLayout(null);
		
		JLabel lblNewLabel = new JLabel("Input:");
		lblNewLabel.setFont(new Font("宋体", Font.PLAIN, 22));
		lblNewLabel.setBounds(43, 48, 81, 21);
		frmSaxQueryExample.getContentPane().add(lblNewLabel);
		
		JLabel lblOutput = new JLabel("Output:");
		lblOutput.setFont(new Font("宋体", Font.PLAIN, 22));
		lblOutput.setBounds(43, 117, 81, 21);
		frmSaxQueryExample.getContentPane().add(lblOutput);
		
		textField = new JTextField();
		textField.setFont(new Font("Consolas", Font.PLAIN, 22));
		textField.setBounds(135, 48, 621, 54);
		frmSaxQueryExample.getContentPane().add(textField);
		textField.setColumns(10);
		
		JButton btnNewButton = new JButton("query");
		btnNewButton.setFont(new Font("宋体", Font.PLAIN, 22));
		btnNewButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				query();
			}
		});
		btnNewButton.setBounds(771, 48, 108, 54);
		frmSaxQueryExample.getContentPane().add(btnNewButton);
		
		JScrollPane scrollPane_1 = new JScrollPane();
		scrollPane_1.setBounds(135, 117, 744, 480);
		frmSaxQueryExample.getContentPane().add(scrollPane_1);
		
		textArea = new JTextArea();
		textArea.setFont(new Font("Monospaced", Font.PLAIN, 22));
		scrollPane_1.setViewportView(textArea);
	}
	
	private void query() {
		String conditions = textField.getText();
		if(conditions == null || conditions.equals("")) {
			printResults(handler.getMovies(), "default(all)");
			return;
		}
		Map<String, String> attrs = parseConditions(conditions);
		List<Movie> results = query(attrs);
		printResults(results, textField.getText());
	}
	
	private List<Movie> query(Map<String, String> attrs) {
		List<Movie> movies = handler.getMovies();
		List<Movie> results = new ArrayList<>();
		for(Movie m : movies) {
			if(m.meet(attrs))
				results.add(m);
		}
		return results;
	}

	private void printResults(List<Movie> results, String command) {
		// TODO Auto-generated method stub
		if(results.isEmpty())
			textArea.setText(textArea.getText() + "[Results]: No Results!\r\n --------------------- \r\n");
		else {
			String head = "[Condition(s)]: " + command + "\r\n" + 
							"[Results]: \r\n";
			textArea.setText(textArea.getText() + head);
			for(Movie m : results)
				textArea.setText(textArea.getText() + m + "\r\n");
			textArea.setText(textArea.getText() + "\r\n" + results.size() + " records selected.\r\n" + "--------------------- \r\n");
		}
	}

	private Map<String, String> parseConditions(String conditions) {
		// TODO Auto-generated method stub
		Map<String, String> attrs = new HashMap<>();
		String[] pairs = conditions.split(";");
		for(String s : pairs) {
			String[] pair = s.split(":");
			attrs.put(pair[0].trim(), pair[1].trim());
		}
		return attrs;
	}
}
