``` mermaid
graph TD
    A["Stretch"] --> B["Name"]
    A --> C["Type"]
    
    subgraph CSub["Type (Either Time or Reps)"]
        C1["Time"]
        C2["Reps"]
    end
    
    C --> C1
    C --> C2
```