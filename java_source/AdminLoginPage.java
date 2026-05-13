import javax.swing.*;
import java.awt.*;

public class AdminLoginPage extends JPanel {
    public AdminLoginPage() {
        setLayout(new GridBagLayout());
        setBackground(new Color(20, 20, 22));
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(10, 10, 10, 10);

        JLabel label = new JLabel("ADMIN LOGIN");
        label.setFont(new Font("Arial", Font.BOLD, 32));
        label.setForeground(Color.WHITE);
        gbc.gridx = 0; gbc.gridy = 0; gbc.gridwidth = 2;
        add(label, gbc);

        gbc.gridwidth = 1;
        gbc.gridy = 1;
        add(createLabel("Username:"), gbc);
        JTextField userField = new JTextField(15);
        gbc.gridx = 1;
        add(userField, gbc);

        gbc.gridx = 0; gbc.gridy = 2;
        add(createLabel("Password:"), gbc);
        JPasswordField passField = new JPasswordField(15);
        gbc.gridx = 1;
        add(passField, gbc);

        JButton loginBtn = new JButton("LOGIN");
        loginBtn.setBackground(new Color(37, 99, 235));
        loginBtn.setForeground(Color.WHITE);
        gbc.gridx = 0; gbc.gridy = 3; gbc.gridwidth = 2;
        add(loginBtn, gbc);

        loginBtn.addActionListener(e -> {
            String user = userField.getText();
            String pass = new String(passField.getPassword());
            if (user.equals("lorence") && pass.equals("123")) {
                Main.showAdminDashboard();
            } else {
                JOptionPane.showMessageDialog(this, "Invalid Credentials");
            }
        });

        JButton backBtn = new JButton("BACK");
        gbc.gridy = 4;
        add(backBtn, gbc);
        backBtn.addActionListener(e -> Main.showMenu());
    }

    private JLabel createLabel(String text) {
        JLabel l = new JLabel(text);
        l.setForeground(Color.LIGHT_GRAY);
        return l;
    }
}
