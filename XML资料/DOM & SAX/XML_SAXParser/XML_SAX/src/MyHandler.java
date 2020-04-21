import java.time.Duration;
import java.time.Year;
import java.util.ArrayList;
import java.util.List;

import org.xml.sax.Attributes;
import org.xml.sax.ContentHandler;
import org.xml.sax.Locator;
import org.xml.sax.SAXException;

class MyHandler implements ContentHandler{
		
	private List<Movie> movies;
	
	public List<Movie> getMovies() {
		return movies;
	}

	private Movie movie;
	
	private String currentTag;
	
	private List<String> directors;
	private List<String> writers;
	private List<String> stars;
	private List<String> genres;
	
	
	@Override
    public void startDocument() throws SAXException {
        // TODO Auto-generated method stub
    	System.out.print("Start parsing...\r\n");
        movies = new ArrayList<>();

    }
	
	@Override
    public void endDocument() throws SAXException {
        // TODO Auto-generated method stub
		System.out.print("Parsing complete!\r\n");
    }

    /**
     * 当读取到第一个元素时开始做什么
     */

    @Override
    public void startElement(String uri, String localName, String qName,
            Attributes atts) throws SAXException {
    	if (qName.equals("movie")) {
            movie = new Movie();
            movie.setId(atts.getValue(1));
            movie.setYear(Year.parse(atts.getValue(2)));
        }
    	else if(qName.equals("directors")) {
    		directors = new ArrayList<>();
    	}
    	else if(qName.equals("writers")) {
    		writers = new ArrayList<>();
    	}
    	else if(qName.equals("stars")) {
    		stars = new ArrayList<>();
    	}
    	else if(qName.equals("genres")) {
    		genres = new ArrayList<>();
    	}
    	
    	currentTag = qName;
    }
    /**
     * 表示读取到第一个元素结尾时做什么
     */
    @Override
    public void endElement(String uri, String localName, String qName)
            throws SAXException {
    	if (qName.equals("movie")) {
    		movie.setDirectors(directors);
    		movie.setWriters(writers);
    		movie.setStars(stars);
    		movie.setGenres(genres);
            movies.add(movie);
        }
    	currentTag = null;
    }
    /**
     * 表示读取字符串时做什么
     */
    @Override
    public void characters(char[] ch, int start, int length)
            throws SAXException {
    	String tagName = this.currentTag;
        if (tagName != "" && tagName != null && tagName.length() > 0) {
            //date为解析后得到的数据
            String content = new String(ch, start, length);
            //给student对象赋值
            setMovie(tagName, content);
        }
    }

    private void setMovie(String tagName, String content) {
		// TODO Auto-generated method stub
    	switch (tagName) {
	        case "name":
	            movie.setName(content);
	            break;
	        case "intro":
	        	movie.setIntro(content);
	            break;
	        case "country":
	            movie.setCountry(content);
	            break;
	        case "level":
	            movie.setLevel(content);
	            break;
	        case "duration":
	            movie.setDuration(Duration.parse(content));
	            break;
	        case "Opening_Weekend_USA":
	            movie.setBox(Long.parseLong(content.replace(",", "")));
	            break;
	        case "director":
	        	directors.add(content);
	        	break;
	        case "writer":
	        	writers.add(content);
	        	break;
	        case "star":
	        	stars.add(content);
	        	break;
	        case "label":
	        	genres.add(content);
	        	break;
	        default:
	            break;
    	}
	}

	@Override
    public void setDocumentLocator(Locator locator) {
        // TODO Auto-generated method stub

    }

    @Override
    public void startPrefixMapping(String prefix, String uri)
            throws SAXException {
        // TODO Auto-generated method stub

    }

    @Override
    public void endPrefixMapping(String prefix) throws SAXException {
        // TODO Auto-generated method stub

    }


    @Override
    public void ignorableWhitespace(char[] ch, int start, int length)
            throws SAXException {
        // TODO Auto-generated method stub

    }

    @Override
    public void processingInstruction(String target, String data)
            throws SAXException {
        // TODO Auto-generated method stub

    }

    @Override
    public void skippedEntity(String name) throws SAXException {
        // TODO Auto-generated method stub

    }

}
