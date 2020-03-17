/**
 * 
 */
package net.mooctest;

import static org.junit.Assert.*;

import org.junit.Test;

public class NextdayTest {
	Date date;
    Year year;
    Month month;
    Day day;
    
    /**
     * nextDay函数测试
     */
	@Test
	public void test() {
		Nextday n = new Nextday();
        date = Nextday.nextDay(new Date(1, 30, 1));
        assertEquals(date.getMonth().getCurrentPos(), 1);
        assertEquals(date.getDay().getCurrentPos(), 31);
        assertEquals(date.getYear().getCurrentPos(), 1);
        
        date = Nextday.nextDay(new Date(1, 31, 1));
        assertEquals(date.getMonth().getCurrentPos(), 2);
        assertEquals(date.getDay().getCurrentPos(), 1);
        assertEquals(date.getYear().getCurrentPos(), 1);

        date = Nextday.nextDay(new Date(12, 31, -1));
        assertEquals(date.getMonth().getCurrentPos(), 1);
        assertEquals(date.getDay().getCurrentPos(), 1);
        assertEquals(date.getYear().getCurrentPos(), 1);
        
        date = Nextday.nextDay(new Date(2, 29, 400));
        assertEquals(date.getMonth().getCurrentPos(), 3);
        assertEquals(date.getDay().getCurrentPos(), 1);
        assertEquals(date.getYear().getCurrentPos(), 400);
        
        date = Nextday.nextDay(new Date(2, 29, -5));
        assertEquals(date.getMonth().getCurrentPos(), 3);
        assertEquals(date.getDay().getCurrentPos(), 1);
        assertEquals(date.getYear().getCurrentPos(), -5);
        
        date = Nextday.nextDay(new Date(2, 29, -1));
        assertEquals(date.getMonth().getCurrentPos(), 3);
        assertEquals(date.getDay().getCurrentPos(), 1);
        assertEquals(date.getYear().getCurrentPos(), -1);
        
        date = Nextday.nextDay(new Date(2, 28, 100));
        assertEquals(date.getMonth().getCurrentPos(), 3);
        assertEquals(date.getDay().getCurrentPos(), 1);
        assertEquals(date.getYear().getCurrentPos(), 100);
        
        date = Nextday.nextDay(new Date(2, 28, -4));
        assertEquals(date.getMonth().getCurrentPos(), 3);
        assertEquals(date.getDay().getCurrentPos(), 1);
        assertEquals(date.getYear().getCurrentPos(), -4);
        
        date = Nextday.nextDay(new Date(2, 28, -101));
        assertEquals(date.getMonth().getCurrentPos(), 3);
        assertEquals(date.getDay().getCurrentPos(), 1);
        assertEquals(date.getYear().getCurrentPos(), -101);
        
	}
	
	/**
	 * 空值测试
	 */
	@Test
	public void nullTest()
	{
		try{
			day = new Day(1, null);            
        	fail("No exception thrown.");
        }catch(Exception e){
            assertTrue(e instanceof IllegalArgumentException);
            assertTrue(e.getMessage().contains("Not a valid day"));
        }
		
		try{
			month = new Month(1, null);           
        	fail("No exception thrown.");
        }catch(Exception e){
            assertTrue(e instanceof IllegalArgumentException);
            assertTrue(e.getMessage().contains("Not a valid month"));
        }
	}
	
	/**
	 * isValid函数测试
	 */
	@Test
	public void isValidTest()
	{
		try{
			year = new Year(1);
			year.setCurrentPos(0);
			month = new Month(1, year);
        }catch(Exception e){
            assertTrue(e instanceof IllegalArgumentException);
            assertTrue(e.getMessage().contains("Not a valid month"));
        }
		
		try{
			year = new Year(1);
			month = new Month(1, year);
			year.setCurrentPos(0);
			day = new Day(1, month);
        }catch(Exception e){
            assertTrue(e instanceof IllegalArgumentException);
            assertTrue(e.getMessage().contains("Not a valid day"));
        }
	}
	
	
	/**
	 * 重载equals函数和increment函数测试
	 */
	@Test
	public void overloadedEqulasAndIncrementTest()
	{
		year = new Year(-1);
		month = new Month(1, year);
		day = new Day(1, month);
		year.increment();
		assertEquals(year.getCurrentPos(), 1);
        year = new Year(1);
		year.increment();
		assertEquals(year.getCurrentPos(), 2);
	}
	
	/**
	 * 重载equals函数测试
	 */
	@Test
	public void overloadedEqulasTest()
	{
		date = new Date(1, 1, 1);
		
		year = new Year(3);
		month = new Month(1, year);
		day = new Day(1, month);
		
		assertFalse(date.equals(1));
        assertFalse(date.equals(new Date(2,2,2)));
        assertFalse(date.equals(new Date(2,1,2)));
        assertFalse(date.equals(new Date(2,2,1)));
        assertFalse(date.equals(new Date(1,2,2)));
        assertFalse(date.equals(new Date(1,2,1)));
        assertFalse(date.equals(new Date(1,1,2)));
        assertTrue(date.equals(new Date(1,1,1)));
        
        assertFalse(year.equals(1));
		assertFalse(year.equals(new Year(1)));
		assertTrue(year.equals(new Year(3)));
		
        assertFalse(month.equals(1));
		assertFalse(month.equals(new Month(2, new Year(2))));
		assertFalse(month.equals(new Month(1, new Year(2))));
		assertTrue(month.equals(new Month(1, new Year(3))));
		
		assertFalse(day.equals(1));
		assertFalse(day.equals(new Day(2, new Month(2, new Year(2)))));
		assertFalse(day.equals(new Day(2, new Month(1, new Year(2)))));
		assertFalse(day.equals(new Day(1, new Month(1, new Year(2)))));
		assertTrue(day.equals(new Day(1, new Month(1, new Year(3)))));
	}
	
	/**
	 * 对象有效性测试
	 */
	@Test
	public void validTest(){
		//年份有效性测试
        try{
        	date = new Date(1, 1, 0);            
        	fail("No exception thrown.");
        }catch(Exception e){
            assertTrue(e instanceof IllegalArgumentException);
            assertTrue(e.getMessage().contains("Not a valid month"));
        }
        
		//月份有效性测试
        try{
        	date = new Date(13, 1, 1);            
        	fail("No exception thrown.");
        }catch(Exception e){
            assertTrue(e instanceof IllegalArgumentException);
            assertTrue(e.getMessage().contains("Not a valid month"));
        }
        try{
        	date = new Date(-1, 1, 1);            
        	fail("No exception thrown.");
        }catch(Exception e){
            assertTrue(e instanceof IllegalArgumentException);
            assertTrue(e.getMessage().contains("Not a valid month"));
        }
        
        //日期有效性测试
        try{
        	date = new Date(1, 32, 1);            
        	fail("No exception thrown.");
        }catch(Exception e){
            assertTrue(e instanceof IllegalArgumentException);
            assertTrue(e.getMessage().contains("Not a valid day"));
        }
        try{
        	date = new Date(1, -1, 1);            
        	fail("No exception thrown.");
        }catch(Exception e){
            assertTrue(e instanceof IllegalArgumentException);
            assertTrue(e.getMessage().contains("Not a valid day"));
        }
        
        //平闰年2月份天数测试
        try{
        	date = new Date(2, 30, 4);            
        	fail("No exception thrown.");
        }catch(Exception e){
            assertTrue(e instanceof IllegalArgumentException);
            assertTrue(e.getMessage().contains("Not a valid day"));
        }
        try{
        	date = new Date(2, 29, 5);            
        	fail("No exception thrown.");
        }catch(Exception e){
            assertTrue(e instanceof IllegalArgumentException);
            assertTrue(e.getMessage().contains("Not a valid day"));
        }
	}
	
	/**
	 * 重载toString函数测试
	 */
	@Test
	public void overloadedToStringTest()
	{
		date = new Date(1, 1, 1);
		assertEquals(date.toString(), "1/1/1");
	}
}
