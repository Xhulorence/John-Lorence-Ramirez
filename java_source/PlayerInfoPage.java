import javax.swing.*;
import java.awt.*;

public class PlayerInfoPage extends JPanel {
    public PlayerInfoPage(PlayerManager playerManager) {
        setLayout(new GridBagLayout());
        setBackground(new Color(20, 20, 22));
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(10, 10, 10, 10);

        JLabel title = new JLabel("PLAYER INFORMATION");
        title.setFont(new Font("Arial", Font.BOLD, 32));
        title.setForeground(Color.WHITE);
        gbc.gridx = 0; gbc.gridy = 0; gbc.gridwidth = 2;
        add(title, gbc);

        gbc.gridwidth = 1;
        gbc.gridy = 1;
        add(new JLabel("Name:") {{ setForeground(Color.WHITE); }}, gbc);
        JTextField nameField = new JTextField(20);
        gbc.gridx = 1;
        add(nameField, gbc);

        gbc.gridx = 0; gbc.gridy = 2;
        add(new JLabel("Message:") {{ setForeground(Color.WHITE); }}, gbc);
        JTextField msgField = new JTextField(20);
        gbc.gridx = 1;
        add(msgField, gbc);

        JButton continueBtn = new JButton("CONTINUE");
        continueBtn.setBackground(new Color(37, 99, 235));
        continueBtn.setForeground(Color.WHITE);
        gbc.gridx = 0; gbc.gridy = 3; gbc.gridwidth = 2;
        add(continueBtn, gbc);

        continueBtn.addActionListener(e -> {
            playerManager.savePlayer(nameField.getText(), msgField.getText());
            Main.showStartPage();
        });

        JButton backBtn = new JButton("BACK");
        gbc.gridy = 4;
        add(backBtn, gbc);
        backBtn.addActionListener(e -> Main.showMenu());
    }
}
