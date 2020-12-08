package Interface;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.io.IOException;
import javax.swing.JComboBox;
public class WelcomeInterface {

    public static void main(String[] args) throws IOException {
        Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
        double height = screenSize.getHeight();
        double width = screenSize.getWidth();
        JFrame mainFrame = new JFrame();
        mainFrame.setSize((int)width, (int)height);
        JPanel mainPanel = new JPanel();
        GridLayout mainLayout = new GridLayout(0,2);
        mainPanel.setLayout(mainLayout);

        String[] airports = {"", "NYC", "PAR", "BAMAKOOO"};
        mainPanel.add(new JButton("Button 1"));
        final JComboBox<String> departure = new JComboBox<String>(airports);
        JButton selectButton = new JButton("Confirm");
        selectButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                String choice = (String) departure.getSelectedItem();
                if (choice.equals("")){
                    Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
                    double height = screenSize.getHeight();
                    double width = screenSize.getWidth();
                    JFrame popUpFrame = new JFrame();
                    popUpFrame.setSize((int)width/5, (int)height/5);
                    JPanel popPup = new JPanel();
                    popUpFrame.setName("Incorrect");
                    popPup.add(new JLabel("Please select a valid airport"));
                    popUpFrame.add(popPup);
                    popUpFrame.setVisible(true);
                }
                else {
                    System.out.println(choice);
                }
            }
        });
        JPanel choicePanel = new JPanel();
        choicePanel.add(departure);
        choicePanel.add(selectButton);

        mainPanel.add(choicePanel);
        //mainPanel.add(new JButton("Button 2"));
        //mainPanel.add(new ImagePanel(new ImageIcon("file path from src").getImage()));
        //mainPanel.add(new JButton("Button 3"));
        //mainPanel.add(new JButton("Long-Named Button 4"));
        //mainPanel.add(new JButton("5"));


        mainFrame.add(mainPanel);
        mainFrame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        mainFrame.setVisible(true);
    }
}
