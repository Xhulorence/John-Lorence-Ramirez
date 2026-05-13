import javax.swing.*;
import java.awt.*;

public class MenuPage extends JPanel {
    public MenuPage() {
        setLayout(new GridBagLayout());
        setBackground(new Color(20, 20, 22));
        GridBagConstraints gbc = new GridBagConstraints();

        JLabel title = new JLabel("JUMBLE MASTER");
        title.setFont(new Font("Arial", Font.BOLD, 72));
        title.setForeground(Color.WHITE);
        gbc.gridx = 0;
        gbc.gridy = 0;
        gbc.insets = new Insets(0, 0, 50, 0);
        add(title, gbc);

        JPanel buttonPanel = new JPanel(new GridLayout(1, 2, 20, 0));
        buttonPanel.setOpaque(false);

        JButton adminBtn = createStyledButton("ADMIN", new Color(40, 40, 45));
        JButton playerBtn = createStyledButton("PLAYER", new Color(37, 99, 235));

        adminBtn.addActionListener(e -> Main.showAdminLogin());
        playerBtn.addActionListener(e -> Main.showPlayerInfo());

        buttonPanel.add(adminBtn);
        buttonPanel.add(playerBtn);

        gbc.gridy = 1;
        add(buttonPanel, gbc);
    }

    private JButton createStyledButton(String text, Color bg) {
        JButton btn = new JButton(text);
        btn.setPreferredSize(new Dimension(250, 150));
        btn.setBackground(bg);
        btn.setForeground(Color.WHITE);
        btn.setFont(new Font("Arial", Font.BOLD, 24));
        btn.setFocusPainted(false);
        btn.setBorder(BorderFactory.createEmptyBorder());
        return btn;
    }
}
