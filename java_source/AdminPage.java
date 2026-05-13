import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;

public class AdminPage extends JPanel {
    private WordManager wordManager;
    private JTable table;
    private DefaultTableModel tableModel;

    public AdminPage(WordManager wordManager) {
        this.wordManager = wordManager;
        setLayout(new BorderLayout(20, 20));
        setBackground(new Color(20, 20, 22));
        setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        JLabel title = new JLabel("ADMIN DASHBOARD (Max 15 Words)");
        title.setFont(new Font("Arial", Font.BOLD, 24));
        title.setForeground(Color.WHITE);
        add(title, BorderLayout.NORTH);

        String[] columns = {"Word", "Hint"};
        tableModel = new DefaultTableModel(columns, 0);
        table = new JTable(tableModel);
        refreshTable();
        add(new JScrollPane(table), BorderLayout.CENTER);

        JPanel controlPanel = new JPanel(new GridLayout(1, 4, 10, 0));
        controlPanel.setOpaque(false);

        JButton addBtn = new JButton("ADD");
        JButton editBtn = new JButton("EDIT");
        JButton deleteBtn = new JButton("DELETE");
        JButton backBtn = new JButton("BACK");

        addBtn.addActionListener(e -> showAddDialog());
        deleteBtn.addActionListener(e -> {
            int row = table.getSelectedRow();
            if (row != -1) {
                wordManager.removeWord(row);
                refreshTable();
            }
        });
        backBtn.addActionListener(e -> Main.showMenu());

        controlPanel.add(addBtn);
        controlPanel.add(editBtn);
        controlPanel.add(deleteBtn);
        controlPanel.add(backBtn);
        add(controlPanel, BorderLayout.SOUTH);
    }

    private void refreshTable() {
        tableModel.setRowCount(0);
        for (WordManager.WordEntry w : wordManager.getWords()) {
            tableModel.addRow(new Object[]{w.word, w.hint});
        }
    }

    private void showAddDialog() {
        JTextField wField = new JTextField();
        JTextField hField = new JTextField();
        Object[] message = { "Word:", wField, "Hint:", hField };
        int option = JOptionPane.showConfirmDialog(null, message, "Add Word", JOptionPane.OK_CANCEL_OPTION);
        if (option == JOptionPane.OK_OPTION) {
            wordManager.addWord(wField.getText(), hField.getText());
            refreshTable();
        }
    }
}
