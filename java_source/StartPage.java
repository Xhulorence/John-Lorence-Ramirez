import javax.swing.*;
import java.awt.*;

public class StartPage extends JPanel {
    public StartPage(PlayerManager playerManager) {
        setLayout(new GridBagLayout());
        setBackground(new Color(20, 20, 22));
        GridBagConstraints gbc = new GridBagConstraints();

        JLabel स्वागत = new JLabel("Welcome, " + playerManager.getName() + "!");
        स्वागत.setFont(new Font("Arial", Font.BOLD, 48));
        स्वागत.setForeground(Color.WHITE);
        gbc.gridy = 0;
        add(स्वागत, gbc);

        JTextArea instr = new JTextArea("Can you solve all the jumbled words\nbefore time runs out? (15 words total)");
        instr.setEditable(false);
        instr.setOpaque(false);
        instr.setForeground(Color.LIGHT_GRAY);
        instr.setFont(new Font("Arial", Font.PLAIN, 24));
        gbc.gridy = 1;
        gbc.insets = new Insets(20, 0, 40, 0);
        add(instr, gbc);

        JButton startBtn = new JButton("START GAME");
        startBtn.setPreferredSize(new Dimension(200, 60));
        startBtn.setBackground(new Color(37, 99, 235));
        startBtn.setForeground(Color.WHITE);
        gbc.gridy = 2;
        add(startBtn, gbc);

        startBtn.addActionListener(e -> Main.showGamePage());
        
        JButton backBtn = new JButton("BACK");
        gbc.gridy = 3;
        add(backBtn, gbc);
        backBtn.addActionListener(e -> Main.showPlayerInfo());
    }
}
