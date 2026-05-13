import javax.swing.*;
import java.awt.*;

public class ResultPage extends JPanel {
    public ResultPage(PlayerManager playerManager, int score, long timeSpent) {
        setLayout(new GridBagLayout());
        setBackground(new Color(20, 20, 22));
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(10, 10, 10, 10);

        JLabel winLabel = new JLabel("CONGRATULATIONS!");
        winLabel.setFont(new Font("Arial", Font.BOLD, 48));
        winLabel.setForeground(Color.YELLOW);
        gbc.gridy = 0;
        add(winLabel, gbc);

        JLabel nameLabel = new JLabel(playerManager.getName());
        nameLabel.setFont(new Font("Arial", Font.BOLD, 32));
        nameLabel.setForeground(Color.WHITE);
        gbc.gridy = 1;
        add(nameLabel, gbc);

        JLabel scoreLabel = new JLabel("Final Score: " + score + " / 15");
        scoreLabel.setFont(new Font("Arial", Font.PLAIN, 24));
        scoreLabel.setForeground(Color.LIGHT_GRAY);
        gbc.gridy = 2;
        add(scoreLabel, gbc);

        JLabel timeLabel = new JLabel("Time: " + timeSpent + " seconds");
        timeLabel.setForeground(Color.LIGHT_GRAY);
        gbc.gridy = 3;
        add(timeLabel, gbc);

        JPanel btnPanel = new JPanel();
        btnPanel.setOpaque(false);
        JButton againBtn = new JButton("PLAY AGAIN");
        JButton menuBtn = new JButton("BACK TO MENU");
        JButton exitBtn = new JButton("EXIT");

        againBtn.addActionListener(e -> Main.showGamePage());
        menuBtn.addActionListener(e -> Main.showMenu());
        exitBtn.addActionListener(e -> System.exit(0));

        btnPanel.add(againBtn);
        btnPanel.add(menuBtn);
        btnPanel.add(exitBtn);
        gbc.gridy = 4;
        add(btnPanel, gbc);
    }
}
